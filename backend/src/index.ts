import fastify from 'fastify'
import {PostController} from "./posts/post-controller";

const server = fastify();

type OriginCallback = (err: Error | null, allow: boolean) => void;
server.register(require('@fastify/cors'), (instance) => ({
    origin: (origin: string, callback: OriginCallback) => {
        const hostname = new URL(origin).hostname
        if (hostname === "localhost") {
            callback(null, true)
            return
        }
        // Generate an error on other origins, disabling access
        callback(new Error("Not allowed"), false)
    }
}))

const postController = new PostController().init();

server.get('/ping', async (request, reply) => {
    return 'pong\n'
})

server.get('/posts', postController.getAll.bind(postController));

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
