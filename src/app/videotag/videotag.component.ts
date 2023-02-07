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
  videosPerPage: number = 6 //needs to be according to pagination in the view/rest export set in DRUPAL

  @Input() id_tag!: string

  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.id_tag) {
      this.route.params.subscribe(params => {
        // Get the updated tag_id from the URL
        this.id_tag = params['id'];
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
    })

    this.uploadService.getPagination
    ("videos-tag", this.id_tag, this.videosPerPage).subscribe(({
                                             pageNumbers
                                           }) => {
      this.pNumsVideos = pageNumbers
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
}
