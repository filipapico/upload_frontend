import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {

  id: number;
  video?: Video;
  video_url?: any;


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['mid'];
  }

  ngOnInit(): void {
    this.uploadService.getVideo(this.id).subscribe((video) => {
      this.video = video[0];

      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.field_media_oembed_video.split("?v=")[1]);
      return this.video_url;

    })
  }

  getLogotype(logoName: string){
    return `https://dev-project-upskill2-grupo4v2.pantheonsite.io${logoName}`;
  }
}
