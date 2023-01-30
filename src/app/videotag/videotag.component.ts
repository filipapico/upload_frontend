import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Tags, Video} from "../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-videotag',
  templateUrl: './videotag.component.html',
  styleUrls: ['./videotag.component.scss']
})
export class VideotagComponent implements OnInit {
  videosByTag!: Video[]
  tag_videos!: Tags[]

  @Input() id_tag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if(this.id_tag){
      this.uploadService.getVideosByTag(this.id_tag, 0).subscribe((videosByTag) => {
        this.videosByTag = videosByTag
      })
    }
    this.route.params.subscribe(params => {
      // Get the updated tag_id from the URL
      this.id_tag = params['tid'];
      this.refreshVideos()
    });
  }

  refreshVideos() {
    this.uploadService.getVideosByTag(this.id_tag, 0).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })
  }
}
