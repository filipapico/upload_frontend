import {Component, OnInit} from '@angular/core';
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
  id_tag!: string
  tag_videos!: Tags[]

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Get the updated tag_id from the URL
      this.id_tag = params['tid'];
      console.log("2nd tid", this.id_tag)
      this.refreshVideos()
    });
    this.uploadService.getVideosByTag(this.id_tag, 0).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })
  }

  refreshVideos() {
    this.uploadService.getVideosByTag(this.id_tag, 0).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })
  }
}
