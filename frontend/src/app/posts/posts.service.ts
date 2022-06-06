import {Injectable} from "@angular/core";
import {PostsApi, Configuration} from "../../../../generated/api/src"
import {PostVms} from "./post.vm";
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

    async posts(): Promise<PostVms> {
        const dto = await this.postsApi.getPosts();
        const vm: PostVms = {
            ...dto,
            items: dto.items.map(postInToVm),
        }
        return Promise.resolve(vm);
    }
}


