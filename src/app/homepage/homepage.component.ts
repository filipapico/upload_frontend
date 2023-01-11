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
  thematics?: Thematic[];
  pNum: number = 0;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.getVideos();

      this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics;
    })
  }

/*  pageSelected(selected: any) {
    if (selected == 'Previous')    //if prev is clicked, numbers will decrease by 1
      this.pNum--;
    else if (selected == 'Next')   //if next is clicked numbers will increase by 1
      this.pNum++;

    this.getVideos();
  }*/

  getVideos() {
    this.uploadService.getLatestVideos().subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })
  }
}
