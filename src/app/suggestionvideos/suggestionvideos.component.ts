import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-suggestionvideos',
  templateUrl: './suggestionvideos.component.html',
  styleUrls: ['./suggestionvideos.component.scss']
})
export class SuggestionvideosComponent implements OnInit {

  id: any;
  indexVideo: number = 0;

  @Input() type?: any;

  constructor(private route: ActivatedRoute, private uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.getPlaylist(this.id).subscribe((type: any) => {
      this.type = type.map((v: any) => {
        let video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + v.field_media_oembed_video.split("?v=")[1]);
        return {
          ...v,
          video_url: video_url
        };
      });
      console.log(this.type);
    })
  }


  getVideo(index: any) {
    console.log(index)
    this.indexVideo = index;
    console.log(this.type)
    return this.indexVideo;
  }
}


