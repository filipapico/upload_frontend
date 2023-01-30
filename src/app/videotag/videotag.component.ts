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
  videosByTag!: Video[];
  tag_videos!: Tags[];
  pageNumber: number = 0;
  visible = false;

  @Input() id_tag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.id_tag) {
      this.uploadService.getVideosByTag(this.id_tag, this.pageNumber).subscribe((videosByTag) => {
        this.videosByTag = videosByTag
      })
    } else{
      this.route.params.subscribe(params => {
        // Get the updated tag_id from the URL
        this.id_tag = params['tid'];
        this.refreshVideos()
      });
    }
  }

  refreshVideos() {
    this.uploadService.getVideosByTag(this.id_tag, this.pageNumber).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })
  }

  /*toggleVisible(): void {
    this.visible = !this.visible;
  }

  getLessVideos(p: number): void {
    if (this.videosByTag.length <= 6) {
      p--
      this.pageNumber = p
      this.refreshVideos()
      this.toggleVisible()
    }
  }

  getMoreVideos(p: number): void {
    if (this.videosByTag.length <= 6) {
      p++
      this.pageNumber = p
      this.refreshVideos()
      this.toggleVisible()
    }
  }*/

}
