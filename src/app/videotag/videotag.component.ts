import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";
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
  videosPerPage: number = 6 //needs to be according to pagination in the view/rest export set in DRUPAL

  @Input() idTag!: string;
  @Input() title!: string;
  @Input() tagslist!: string;
  @Input() all!: string;
  // INPUT NAME? MAYBE?!?
  @Input() nameTag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.nameTag) {
      this.route.params.subscribe(params => {
        // Get the updated tag_id from the URL
        this.nameTag = params['name'];
        this.refresh(this.nameTag, 0)
      })
    } else {
      this.refresh(this.nameTag, this.pNumVideos)
    }
  }

  refresh(tag: string, pageVideos: number) {
    this.pNumVideos = pageVideos
    this.uploadService.getVideosByTagName(this.nameTag, this.pNumVideos).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })

    this.uploadService.getPagination
    ("videos-tag-name", this.nameTag, this.videosPerPage).subscribe(({
                                                                pageNumbers
                                                              }) => {
      this.pNumsVideos = pageNumbers
      console.log(this.nameTag)
    })
  }

  /*refresh(tag: string, pageVideos: number) {
    this.pNumVideos = pageVideos
    this.uploadService.getVideosByTag(this.idTag, this.pNumVideos).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
    })

    this.uploadService.getPagination
    ("videos-tag", this.idTag, this.videosPerPage).subscribe(({
                                                                 pageNumbers
                                                               }) => {
      this.pNumsVideos = pageNumbers
    })
  }*/

  getTags(tags: string) {
    return tags
      .split(',')
      .map(this.getTag)
      .join('')
  }

  getTag(text: string) {
    return `#${text.trim().toLowerCase()} `;
  }
}
