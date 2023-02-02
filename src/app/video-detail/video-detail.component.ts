import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";
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
  mediaEntityType = "media";
  channelVideos?: Video[] = []; //array containing the channel's videos
  nid?: number;

  @Input() id_video?: string
  @Input() type?: string;


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }

  // Detetar mudanca nos inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id_video && changes['id_video']) {
      this.id = parseInt(this.id_video);
      this.refresh();
    }
  }

  ngOnInit(): void {
    if (!this.id_video) {
      // Subscribe changes in URL parameters
      this.route.params.subscribe(params => {
        // Detect changes in slug and save them in variable
        let slug = params['name'];
        // Get the media contents using the media slug. 1. API request field "link to media" in all-videos view
        // (used as input each time the app-contentcard is used)
        // 2. Get the media ID using the media json file "SITE/video/slug?_format=json"
        // 3. Make new API request to the all-video view and get all the remaining data (e.g. tags, duration, ...)
        this.uploadService.getContentBySlug("video", slug).subscribe((data: any) => {
          if (!data.mid) {
            return;
          }
          this.id = data.mid[0].value;
          this.refresh()
        })

      });
    }
  }

  refresh() {
    this.uploadService.getVideo(this.id).subscribe((video) => {
      this.video = video[0];
      this.uploadService.getChannelVideos(parseInt(this.video.nid)).subscribe((videos) => {
        this.channelVideos = videos;
      });

      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.field_media_oembed_video.split("?v=")[1]);
      return this.video_url;
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
