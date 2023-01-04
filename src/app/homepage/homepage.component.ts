import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematic, Video} from "../interfaces";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  latestVideos: Video[] = [];
  thematics?: Thematic[] ;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getLatestVideos().subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })

    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })
  }

}
