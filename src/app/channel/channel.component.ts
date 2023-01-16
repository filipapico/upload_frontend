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
  nid: string; //channel id
  videos?: Video[] = []; //array containing the channel's videos
  comments?: Comment[] = [];
  nodeComments?: any;
  channelTitle?: string;
  channelDescription?: string;
  channelCoverPhoto?: string;
  channelLogotype?: string;
  type: string = "node";


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.nid = route.snapshot.params['nid'];
  }

  ngOnInit(): void {
    this.uploadService.getChannelVideos(this.nid).subscribe((videos) => {
      this.videos = videos;
      //reaching Channel details from the first video of the channel (not a good idea! if it is empty?
      //need to work on that

      this.channelTitle = this.videos[0].title;
      this.channelDescription = this.videos[0].body;
      this.channelCoverPhoto = this.videos[0].field_cover_photo;
      this.channelLogotype = this.videos[0].field_logotype;
    })

    //getting comments of that specific channel
/*    this.uploadService.getComments(this.type).subscribe((comments) => {
      this.comments = comments;
      this.comments.map((element: any) => {
        if (element.nid == this.nid)
          this.nodeComments.push(element);
      });
    })*/

    // console.log(this.nodeComments);


  }

}
