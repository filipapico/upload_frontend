import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Channels, Thematic, Video} from "../interfaces";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  latestVideos: Video[] = [];
  thematics?: Thematic[];
  channels?: Channels[];
  pNum: any = 0;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.getVideos();

      this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics;
    })
  }

  pageSelected(selected: any) {
    if (selected == 'Previous' && this.pNum > 0)    //if prev is clicked, numbers will decrease by 1
      this.pNum--;
    else if (selected == 'Next')   //if next is clicked numbers will increase by 1
      this.pNum++;

    this.getVideos();
  }

  getVideos() {
    this.uploadService.getLatestVideos(this.pNum).subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })
    this.uploadService.getChannels().subscribe((channels) => {
        this.channels = channels;
      }
    )
  }
}
