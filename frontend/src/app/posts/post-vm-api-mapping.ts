import {AnnouncementVm, isAnnouncementVm, isNewsVm, NewsVm, PostVm} from "./post.vm";
import {PostDto, NewsDto, AnnouncementDto} from "../../../../generated/api/src"
import {NonExhaustiveSwitch} from "../commons/error/NonExhaustiveSwitch";

export function postOutToDto(post: PostVm): PostDto {
    if(isNewsVm(post)){
        const dto: NewsDto = {
            ...post,
        };
        return dto;
    } else if(isAnnouncementVm(post)){
        const dto: AnnouncementDto = {
            ...post,
            expectedOn: post.expectedOn.toISOString(),
        };
        return dto;
    }

    throw new NonExhaustiveSwitch();
}

export function postInToVm(dto: PostDto): PostVm {
    if(isNewsDto(dto)){
        const vm: NewsVm = {
            ...dto
        };
        return vm;
    } else if(isAnnouncementDto(dto)){
        const vm: AnnouncementVm = {
            ...dto,
            expectedOn: new Date(dto.expectedOn)
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
