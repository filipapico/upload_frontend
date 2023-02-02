import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Video} from "../interfaces";

@Component({
  selector: 'app-channelplayer',
  templateUrl: './channelplayer.component.html',
  styleUrls: ['./channelplayer.component.scss']
})
export class ChannelplayerComponent {
  id: any;
  channelPlayer?: Video[];
  indexVideo: number = 0;

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['nid'];
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });

    if (!this.id) {
      this.route.params.subscribe((params) => {
        let slug = params['name'] //we have clicked on a video, the slug matches name of the video
        this.uploadService.getContentBySlug("video", slug).subscribe((data: any) => {
          this.id = data.field_channel[0].target_id; // found this path in the JSON endpoint
          this.refresh();
        })
      })
    }
  }

  refresh() {
    this.uploadService.getChannelVideos(this.id).subscribe((videos) => {
      this.channelPlayer = videos.map((v: any) => {
        let video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + v.field_media_oembed_video.split("?v=")[1]);
        return {
          ...v,
          video_url: video_url
        };
      });
    });
  }

  getVideo(index: any) {
    // receives index of the clicked video (in its channel array) as parameter
    this.indexVideo = index;
    return this.indexVideo;
  }
}
