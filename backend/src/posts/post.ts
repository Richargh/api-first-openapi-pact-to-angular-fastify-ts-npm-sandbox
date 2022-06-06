import type {Flavor} from "../common/types/flavor";
import type {UserId} from "../users/user";

export type PostId = Flavor<string, 'Flavor'>

export interface Post {
    _id: PostId;
    title: string,
    createdBy: UserId;
    createdOn: Date;
}

export interface News extends Post {
    intendedAudience: IntendedAudiences,
}

export enum IntendedAudiences {
    Clueless= 'clueless',
    Lazy = 'lazy',
    Adventurous = 'adventurous',
    Aggressive = 'aggressive'
}

export interface Announcement extends Post {
    expectedOn: Date,
    eventSize?: number
}

export function isNews(post: Post): post is News {
    return (post as News).intendedAudience !== undefined;
}

export function isAnnouncement(post: Post): post is Announcement {
    return (post as Announcement).expectedOn !== undefined;
}