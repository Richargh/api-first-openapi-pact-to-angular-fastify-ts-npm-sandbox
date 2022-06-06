import type {FastifyReply, FastifyRequest} from "fastify";
import type {Announcement, News, Post} from "./post";
import {IntendedAudiences} from "./post";
import {postOutToDto} from "../post-domain-api-mapping";
import type {PostDto} from "../../../generated/api/src/models";

export class PostController {

    private posts: Post[] = [];

    getAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const dtos: PostDto[] = this.posts.map(postOutToDto);

        reply.send(dtos);

        return Promise.resolve();
    }

    init(): this {
        const news: News = {
            _id: "1",
            createdBy: "1-2-3",
            createdOn: new Date("2021-10-01"),
            title: "Will there be a party at craigs",
            intendedAudience: IntendedAudiences.Lazy,
        };
        const announcement: Announcement = {
            _id: "1",
            createdBy: "1-2-3",
            createdOn: new Date("2021-10-02"),
            title: "Party at Craigs",
            eventSize: 5,
            expectedOn: new Date("2021-10-05"),
        };
        this.posts.push(news);
        this.posts.push(announcement);
        return this;
    }
}