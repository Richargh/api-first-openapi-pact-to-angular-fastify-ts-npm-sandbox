import { Component } from '@angular/core';
import {TrackByService} from "../commons/changedetection/track-by.service";
import {PostVm} from "./post.vm";
import {Logger} from "../commons/logging/logger";
import {PostsService} from "./posts.service";

const log: Logger = new Logger('PostsComponent');

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  title = 'Posts';

  posts: PostVm[] = [];

  constructor(
    private readonly postsService: PostsService,
    public readonly trackBy: TrackByService) {
  }

  async refreshPosts(): Promise<void> {
    log.info('refreshing posts');
    const vms = await this.postsService.posts();
    this.posts = vms;
  }
}
