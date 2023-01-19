import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Video, Comment} from "../interfaces";
import {faBookmark} from '@fortawesome/free-regular-svg-icons';
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;

  nid: number; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  channelComments?: Comment[] = [];
  channelTitle?: string;
  channelDescription?: string;
  channelCoverPhoto?: string;
  channelLogotype?: string;
  channelEntityType = "node";


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.nid = route.snapshot.params['nid'];
  }

  ngOnInit(): void {
    this.uploadService.getChannelVideos(this.nid).subscribe((videos) => {
      this.videos = videos;
      //reaching Channel details from the first video of the channel (not a good idea! what if it is empty?
      //need to work on that
      this.channelTitle = this.videos[0].title;
      this.channelDescription = this.videos[0].body;
      this.channelCoverPhoto = this.videos[0].field_cover_photo;
      this.channelLogotype = this.videos[0].field_logotype;
    })

    //getting comments of that specific channel:
    this.uploadService.getComments("node", this.nid).subscribe((comments) => {
      this.channelComments = comments;
      console.log(this.channelComments);
    })


  }


}
