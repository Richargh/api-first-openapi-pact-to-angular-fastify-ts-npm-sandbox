import { Component } from '@angular/core';
import {TrackByService} from "../commons/changedetection/track-by.service";
import {PostVm} from "./post.vm";
import {Logger} from "../commons/logging/logger";

const log: Logger = new Logger('Posts');

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  title = 'Posts';

  posts: PostVm[] = [{id: "1", text: "a"}];

  constructor(
    public readonly trackBy: TrackByService) {
  }

  refreshPosts(): Promise<void> {
    log.info('refreshing posts');
    this.posts = [];
    this.posts.push({id: "2", text: "b"});
    return Promise.resolve();
  }
}
