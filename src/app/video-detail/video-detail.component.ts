import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video, Comment} from "../interfaces";
import {DomSanitizer} from "@angular/platform-browser";
import {faBookmark} from '@fortawesome/free-regular-svg-icons';
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnChanges {
  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;

  id!: number;
  video?: Video;
  video_url?: any;
  latestVideosList: Video[] = [];
  mediaEntityType = "media";
  mediaComments?: Comment[] = [];


  @Input() id_video?: string

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id_video && changes['id_video']) {
      this.id = parseInt(this.id_video);
      this.refresh();
    }
  }

  ngOnInit(): void {
    if (!this.id_video) {
      this.id = this.route.snapshot.params['mid'];
      this.refresh()
    }
  }

  refresh() {
    this.uploadService.getVideo(this.id).subscribe((video) => {
      this.video = video[0];

      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.field_media_oembed_video.split("?v=")[1]);
      return this.video_url;

    })

    this.uploadService.getLatestVideos(0).subscribe((latestVideos) => {
      this.latestVideosList = latestVideos;
    })

    //getting comments of that specific video:
    this.uploadService.getComments("media", this.id).subscribe((comments) => {
      this.mediaComments = comments;
    })
  }

  getHashtag(tags: string) {
    return tags
      .split(',')
      .map(this.getTag)
      .join('');
  }

  getTag(item: string) {
    return `#${item.trim().toLowerCase()} `;
  }
}
