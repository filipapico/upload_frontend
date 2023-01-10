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
    this.getLatestVideos()

    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })
  }

  getLatestVideos () {
    this.uploadService.getLatestVideos().subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })
}

/*  pNum = 1;

  pageSelected(selected: any) {
    if(selected == 'Previous' && this.pNum > 1)    //if prev is clicked, numbers will decrease by 1
      this.pNum--;
    else if (selected == 'Next' && this.pNum < this.latestVideos.length)   //if next is clicked numbers will increase by 1
      this.pNum++;

    this.latestVideos;
  }*/

}
