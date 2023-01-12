import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Video} from "../interfaces";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  nid: number; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  channelTitle?: string;
  channelDescription?: string;
  channelCoverPhoto?: string;
  channelLogotype?: string;


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.nid = route.snapshot.params['nid'];
  }

  ngOnInit(): void {
    this.uploadService.getChannelVideos(this.nid).subscribe((videos) => {
      this.videos = videos;
      this.channelTitle = this.videos[0].title;
      this.channelDescription = this.videos[0].body;
      this.channelCoverPhoto = this.videos[0].field_cover_photo;
      this.channelLogotype = this.videos[0].field_logotype;
    })
  }

}
