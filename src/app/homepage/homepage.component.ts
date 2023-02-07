import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Channels, Thematics, Video} from "../interfaces";
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
  allVideos?: Video[];
  id: any = "";
  pNum: any = 0;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  public keyword = 'name';
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
    this.pnumVideos = pageVideos
    this.uploadService.getPagination
    ("latest-videos", '', this.videosPerPage).subscribe(({
                                                           pageNumbers
                                                         }) => {
      this.pNumsVideos = pageNumbers
    })
    this.getVideos(pageVideos)

    this.uploadService.getThematicsByTag("",0).subscribe((thematics) => {
      this.thematics = thematics;
    })
  }

  getVideos(page: number) {
    this.uploadService.getLatestVideos(page).subscribe((latestVideos) => {
      this.latestVideos = latestVideos;
    })
    // COMMENTED code since it's not being used - Thematics ar collected in refresh function
    /*this.uploadService.getThematics(0).subscribe((thematics) => {
      this.thematics = thematics
    })*/
    this.uploadService.getChannels("").subscribe((channels) => {
      this.channels = channels;
    })
    /*this.uploadService.getVideo(this.id).subscribe((allVideos) => {
      this.allVideos = allVideos;
    })*/
  }

  changeSearch(e: any) {
    const v = e.target.value;
    this.uploadService.getSearchVideos(v).subscribe((search) => {
      this.latestVideos = search;
    })
  }
}

//OLD PAGINATIOM
/*pageSelected(selected: any) {
  if (selected == 'Previous' && this.pNum > 0)    //if prev is clicked, numbers will decrease by 1
    this.pNum--;
  else if (selected == 'Next' && this.latestVideos?.length == 10)   //if next is clicked numbers will increase by 1
    this.pNum++;

  this.getVideos();
}*/
