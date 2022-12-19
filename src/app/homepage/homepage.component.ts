import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private uploadService: UploadService) {
  }
  latestVideos: any = [];

  ngOnInit(): void {
    this.uploadService.getLatestVideos().subscribe((latestVideos:any)=>
    {
      this.latestVideos = latestVideos;
      console.log(this.latestVideos);
    })
  }


}
