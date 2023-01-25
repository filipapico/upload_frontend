import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Channels, Video} from "../interfaces";

@Component({
  selector: 'app-channelplayer',
  templateUrl: './channelplayer.component.html',
  styleUrls: ['./channelplayer.component.scss']
})
export class ChannelplayerComponent {

  nid: number; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  channel?: Channels[] = [];

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.nid = route.snapshot.params['nid'];
  }

  ngOnInit(): void {
  /*  this.uploadService.getChannels(this.nid.toString()).subscribe((channel) => {
      this.channel = channel;
    });*/

/*    this.uploadService.getChannelVideos(this.nid).subscribe((videos) => {
      this.videos = videos;
    });*/

  }

}
