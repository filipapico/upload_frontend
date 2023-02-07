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

  nid!: number; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  channelEntityType = "node";
  channel!: Channels[];


  constructor(private route: ActivatedRoute, public uploadService: UploadService) {
    this.nid = route.snapshot.params['nid'];
  }

  refresh() {
    if (this.nid) {
      let nid = this.nid.toString();
      this.uploadService.getChannels(nid).subscribe((channel) => {
        this.channel = channel;
      });

      this.uploadService.getChannelVideos(nid).subscribe((videos) => {
        this.videos = videos;
      });
    }
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.route.params.subscribe((params) => {
      let slug = params['name']
      this.uploadService.getContentBySlug("channel", slug).subscribe((data: any) => {
        this.nid = data.nid[0].value;
        this.refresh();
      })
    })
    this.refresh();//run when the component is initialized, even if no changes in language or parameters yet
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
