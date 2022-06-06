import {AnnouncementVm, isAnnouncementVm, isNewsVm, NewsVm, PostVm} from "./post.vm";
import {PostDto, NewsDto, AnnouncementDto} from "../../../../generated/api/src"
import {NonExhaustiveSwitch} from "../commons/error/NonExhaustiveSwitch";

export function postOutToDto(post: PostVm): PostDto {
    if(isNewsVm(post)){
        const dto: NewsDto = {
            id: post.id,
            createdBy: post.createdBy,
            title: post.title,
            intendedAudience: post.intendedAudience
        };
        return dto;
    } else if(isAnnouncementVm(post)){
        const dto: AnnouncementDto = {
            id: post.id,
            createdBy: post.createdBy,
            title: post.title,
            expectedOn: post.expectedOn.toISOString(),
            eventSize: post.eventSize
        };
        return dto;
    }

    throw new NonExhaustiveSwitch();
}

export function postInToVm(dto: PostDto): PostVm {
    if(isNewsDto(dto)){
        const vm: NewsVm = {
            id: dto.id,
            createdBy: dto.createdBy,
            title: dto.title,
            intendedAudience: dto.intendedAudience
        };
        return vm;
    } else if(isAnnouncementDto(dto)){
        const vm: AnnouncementVm = {
            id: dto.id,
            createdBy: dto.createdBy,
            title: dto.title,
            expectedOn: new Date(dto.expectedOn),
            eventSize: dto.eventSize
        };
        return vm;
    }

    throw new NonExhaustiveSwitch();
}

function isNewsDto(post: PostDto): post is NewsDto {
    return (post as NewsDto).intendedAudience !== undefined;
}

function isAnnouncementDto(post: PostDto): post is AnnouncementDto {
    return (post as AnnouncementDto).expectedOn !== undefined;
}
