import {Injectable} from "@angular/core";
import {PostsApi, Configuration} from "../../../../generated/api/src"
import {PostVm} from "./post.vm";
import {Logger} from "../commons/logging/logger";
import {postInToVm} from "./post-vm-api-mapping";

const log: Logger = new Logger('PostsService');

@Injectable({
    providedIn: "root"
})
export class PostsService {
    private postsApi = new PostsApi(new Configuration({
        basePath: 'http://localhost:8080'
    }));

    async posts(): Promise<PostVm[]> {
        const dtos = await this.postsApi.getPosts();
        return Promise.resolve(dtos.map(postInToVm));
    }
}


