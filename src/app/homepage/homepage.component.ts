import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  latestVideos: LatestVideo[] = [];

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getLatestVideos().subscribe((latestVideos) => {
      // [0] ERROR BELLOW THAT NEEDS CORRECTION. EITHER HERE OR IN INTERFACE DEFINITION...
      this.latestVideos = latestVideos;
      console.log(this.latestVideos);
    })
  }

}
