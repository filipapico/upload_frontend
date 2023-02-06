import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {PagesCount, Tags, Video} from "../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-videotag',
  templateUrl: './videotag.component.html',
  styleUrls: ['./videotag.component.scss']
})
export class VideotagComponent implements OnInit {
  videosByTag!: Video[];
  pNumVideos: number = 0
  pNumsVideos!: number[]

  @Input() id_tag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    if (!this.id_tag) {
      this.route.params.subscribe(params => {
        // Get the updated tag_id from the URL
        this.id_tag = params['name'];
        console.log(this.id_tag)
        this.refresh(this.id_tag, this.pNumVideos)
      })
    } else {
      this.refresh(this.id_tag, this.pNumVideos)
    }
  }

  refresh(tag: string, pageVideos: number) {
    this.pNumVideos = pageVideos
    this.uploadService.getVideosByTag(this.id_tag, this.pNumVideos).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
      console.log(this.videosByTag)
    })

    this.uploadService.getPagination("videos-tag", this.id_tag).subscribe(({itemsPerPage, numberOfPages, pageNumbers, pagesCount})=>{
      this.pNumsVideos = pageNumbers
      this.pNumVideos = pageVideos
      console.log(this.pNumsVideos)
    })
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

  /*Pagination old
  visible = false;
  direction!: string;*/

  /*pagination(direction: string, p: number): void {
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
  }*/

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
