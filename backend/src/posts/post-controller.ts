import type {FastifyReply, FastifyRequest} from "fastify";
import {postOutToDto} from "./post-domain-api-mapping";
import type {PostDto, PostDtosList} from "../../../generated/api/src/models";
import type {PostAppService} from "./post-app-service";

export class PostController {

    constructor(
        private postAppService: PostAppService) {
    }

    getAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const dtos: PostDto[] = this.postAppService.allPosts().map(postOutToDto);
        const posts: PostDtosList = {
            items: dtos,
            links: {}
        }

        reply.send(posts);

        return Promise.resolve();
    }

}
