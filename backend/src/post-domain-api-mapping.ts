import type {Announcement, News, Post} from "./posts/post";
import type {AnnouncementDto, NewsDto, PostDto} from "../../generated/api/src/models";
import {IntendedAudiences, isAnnouncement, isNews} from "./posts/post";
import {NewsDtoIntendedAudienceEnum} from "../../generated/api/src/models";
import {NonExhaustiveSwitch} from "./common/error/NonExhaustiveSwitch";

export function postOutToDto(post: Post): PostDto {
    if(isNews(post)){
        const dto: NewsDto = {
            id: post._id,
            createdBy: post.createdBy,
            title: post.title,
            intendedAudience: intendedAudienceOutToDto(post.intendedAudience)
        };
        return dto;
    } else if(isAnnouncement(post)){
        const dto: AnnouncementDto = {
            id: post._id,
            createdBy: post.createdBy,
            title: post.title,
            expectedOn: post.expectedOn.toISOString(),
            eventSize: post.eventSize
        };
        return dto;
    }

    throw new NonExhaustiveSwitch();
}

export function postInToDomain(dto: PostDto): Partial<Post> {
    if(isNewsDto(dto)){
        const domain: Partial<News> = {
            title: dto.title,
            intendedAudience: intendedAudienceInToDomain(dto.intendedAudience),
        };
        return domain;
    } else if(isAnnouncementDto(dto)){
        const domain: Partial<Announcement> = {
            title: dto.title,
            expectedOn: new Date(dto.expectedOn),
            eventSize: dto.eventSize
        };
        return domain;
    }

    throw new NonExhaustiveSwitch();
}

export function intendedAudienceOutToDto(intendedAudience: IntendedAudiences): NewsDtoIntendedAudienceEnum {
    switch (intendedAudience){
        case IntendedAudiences.Clueless:
            return NewsDtoIntendedAudienceEnum.Clueless;
        case IntendedAudiences.Lazy:
            return NewsDtoIntendedAudienceEnum.Lazy;
        case IntendedAudiences.Adventurous:
            return NewsDtoIntendedAudienceEnum.Adventurous;
        case IntendedAudiences.Aggressive:
            return NewsDtoIntendedAudienceEnum.Aggressive;
    }
}

export function intendedAudienceInToDomain(intendedAudience: NewsDtoIntendedAudienceEnum): IntendedAudiences {
    switch (intendedAudience){
        case NewsDtoIntendedAudienceEnum.Clueless:
            return IntendedAudiences.Clueless;
        case NewsDtoIntendedAudienceEnum.Lazy:
            return IntendedAudiences.Lazy;
        case NewsDtoIntendedAudienceEnum.Adventurous:
            return IntendedAudiences.Adventurous;
        case NewsDtoIntendedAudienceEnum.Aggressive:
            return IntendedAudiences.Aggressive;
    }
}



function isNewsDto(post: PostDto): post is NewsDto {
    return (post as NewsDto).intendedAudience !== undefined;
}

function isAnnouncementDto(post: PostDto): post is AnnouncementDto {
    return (post as AnnouncementDto).expectedOn !== undefined;
}