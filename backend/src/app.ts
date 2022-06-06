import fastify, {FastifyInstance, FastifyServerOptions} from "fastify";
import {PostController} from "./posts/post-controller";
import {PostAppService} from "./posts/post-app-service";

export function build(opts: FastifyServerOptions = {}): FastifyInstance {
    const app = fastify(opts);

    type OriginCallback = (err: Error | null, allow: boolean) => void;
    app.register(require('@fastify/cors'), (instance) => ({
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

    const postController = new PostController(new PostAppService().init());

    app.get('/ping', async (request, reply) => {
        return 'pong\n'
    })

    app.get('/posts', postController.getAll.bind(postController));

    return app;
}
