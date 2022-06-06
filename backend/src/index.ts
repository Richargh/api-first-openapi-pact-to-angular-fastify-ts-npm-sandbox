import fastify from 'fastify'
import {PostController} from "./posts/post-controller";

const server = fastify()

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
