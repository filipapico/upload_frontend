import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Channels, Thematics, Video} from "../interfaces";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  faPlus = faPlus;
  latestVideos?: Video[];
  thematics?: Thematics[];
  channels?: Channels[];
  allVideos?: Video[];
  id: any = "";

  data = this.allVideos;
  pnumVideos: number = 0
  pNumsVideos!: number[];
  videosPerPage: number = 10 //needs to be according to pagination in the view/rest export set in DRUPAL

  constructor(public uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pnumVideos);
    });
    this.refresh(this.pnumVideos);
  }

  refresh(pageVideos: number) {
    this.uploadService.getPagination
    ("latest-videos", '', this.videosPerPage).subscribe(({pageNumbers}) => {
      this.pNumsVideos = pageNumbers
    })
    this.getVideos(pageVideos)

    this.uploadService.getThematicsByTag("", 0).subscribe((thematics) => {
      this.thematics = thematics;
    })
  }

  getVideos(page: number) {
    this.uploadService.getLatestVideos(page).subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })

    this.uploadService.getChannel("").subscribe((channels) => {
      this.channels = channels;
    })
  }

  changeSearch(e: any) {
    const v = e.target.value;
    this.uploadService.getSearchVideos(v).subscribe((search) => {
      this.latestVideos = search;
    })
  }
}
