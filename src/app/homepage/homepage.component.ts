import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Channels, Thematic, Thematics, Video} from "../interfaces";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  latestVideos?: Video[];
  thematics?: Thematics[];
  channels?: Channels[];
  pNum: any = 0;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  public keyword = 'name';
  data = this.latestVideos;


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
      console.log(latestVideos)
    })
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })
    this.uploadService.getChannels().subscribe((channels) => {
        this.channels = channels;
      })
  }

  changeSearch(e: any){
    const v = e.target.value;
    this.uploadService.getSearchVideos(v).subscribe((search) => {
      this.latestVideos = search;
      console.log(v)
    })
  }
}
