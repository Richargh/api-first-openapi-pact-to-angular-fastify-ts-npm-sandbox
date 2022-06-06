import {Announcement, IntendedAudiences, News, Post} from "./post";

export class PostAppService {

    private posts: Post[] = [];

    allPosts(): Post[] {
        return this.posts;
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
            _id: "2",
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
