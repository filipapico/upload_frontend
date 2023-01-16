import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";
import {DomSanitizer} from "@angular/platform-browser";
import {faHeart} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {
  faHeart = faHeart;
  id: number;
  video?: Video;
  video_url?: any;
  latestVideosList: Video[] = [];

  @Input() name?: string
  @Input() field_media_tags?: string
  @Input() field_logotype?: string
  @Input() title?: string
  @Input() created?: string
  @Input() field_duration?: string
  @Input() field_description? :string


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['mid'];
  }

  ngOnInit(): void {
    this.uploadService.getVideo(this.id).subscribe((video) => {
      this.video = video[0];

      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.field_media_oembed_video.split("?v=")[1]);
      return this.video_url;

    })

    this.uploadService.getLatestVideos(0).subscribe((latestVideos) => {
      this.latestVideosList = latestVideos;
    })
  }

  getHashtag(tags: string) {
    return tags
      .split(',')
      .map(this.getTag)
      .join('');
  }

  getTag(item: string) {
    return `#${item.trim()} `;
  }
}
