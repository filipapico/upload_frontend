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
  direction!: string;

  @Input() id_tag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //what was this for?? this.visible = false
    if (this.id_tag) {
      this.uploadService.getVideosByTag(this.id_tag, this.pageNumber).subscribe((videosByTag) => {
        this.videosByTag = videosByTag
      })
    } else {
      this.route.params.subscribe(params => {
        // Get the updated tag_id from the URL
        this.id_tag = params['name'];
        this.refreshVideos()
      });
    }
  }

  refreshVideos() {
    this.uploadService.getVideosByTag(this.id_tag, this.pageNumber).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })
  }

  pagination(direction: string, p: number): void {
    if (this.pageNumber == 0) {
      this.toggleVisible()
      this.changePage(direction, p)
    } else if (this.pageNumber > 0 && this.videosByTag.length == 6) {
      this.changePage(direction, p)
    } else {
      this.changePage(direction, p)
    }
  }

  toggleVisible(): void {
    this.visible = !this.visible;
  }

  changePage(direction: string, p: number): void {
    if (direction == 'down' && this.pageNumber > 0) {
      this.pageNumber--
      console.log(this.pageNumber)
    } else if (direction == 'up' && this.videosByTag.length == 6) {
      this.pageNumber++
    }
    this.refreshVideos()
  }

  getTags(tags: string) {
    return tags
      .split(',')
      .map(this.getTag)
      .join('')
  }

  getTag(text: string) {
    return `#${text.trim().toLowerCase()} `;
  }

  /*OLD
  getLessVideos(p: number): void {
    if (this.pageNumber == 1) {
      if (this.videosByTag.length <= 6) {
        p--
        this.pageNumber = p
        this.refreshVideos()
        this.toggleVisible()
      }
    }
    if (this.videosByTag.length <= 6) {
      p--
      this.pageNumber = p
      this.refreshVideos()
    }
  }

  getMoreVideos(p: number): void {
    if (this.pageNumber == 0) {
      if (this.videosByTag.length <= 6) {
        p++
        this.pageNumber = p
        console.log()
        this.refreshVideos()
      }
      this.toggleVisible()
    } else {
      if (this.videosByTag.length <= 6) {
        p++
        this.pageNumber = p
        this.refreshVideos()
      }
    }
  }*/
}
