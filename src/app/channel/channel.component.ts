import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video, Channels} from "../interfaces";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {

  nid: number; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  channelEntityType = "node";
  channel?: Channels[] = [];


  constructor(private route: ActivatedRoute, public uploadService: UploadService) {
    this.nid = route.snapshot.params['nid'];
  }

  refresh(){
    this.uploadService.getChannels(this.nid.toString()).subscribe((channel) => {
      this.channel = channel;
    });

    this.uploadService.getChannelVideos(this.nid).subscribe((videos) => {
      this.videos = videos;
    });
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
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
