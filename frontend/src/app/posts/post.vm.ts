import {Entity} from "../commons/types/entity";
import {AnnouncementDto, NewsDto, PostDto } from "../../../../generated/api/src";

export interface PostVm extends PostDto, Entity {
    title: string
}

export interface NewsVm extends NewsDto, PostVm {

}

export interface AnnouncementVm extends Omit<AnnouncementDto, 'expectedOn'>, PostVm {
    expectedOn: Date
}

export function isNewsVm(post: PostVm): post is NewsVm {
    return (post as NewsVm).intendedAudience !== undefined;
}

export function isAnnouncementVm(post: PostVm): post is AnnouncementVm {
    return (post as AnnouncementVm).expectedOn !== undefined;
}
