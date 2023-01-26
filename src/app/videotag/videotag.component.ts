import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";

@Component({
  selector: 'app-videotag',
  templateUrl: './videotag.component.html',
  styleUrls: ['./videotag.component.scss']
})
export class VideotagComponent implements OnInit {
  videosByTag!: Video[]

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.uploadService.getVideosByTag('3', 0).subscribe((videosByTag) => {
      this.videosByTag = videosByTag
      console.log(videosByTag)
    })
  }

}
