import {Component, Input} from '@angular/core';
import {faHeart, faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faShareNodes, faHeart as faHeartFull, faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {UploadService} from "../upload.service";


@Component({
  selector: 'app-contentcard',
  templateUrl: './contentcard.component.html',
  styleUrls: ['./contentcard.component.scss']
})
export class ContentcardComponent {
  faHeart = faHeart;
  faHeartFull = faHeartFull;
  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;
  faShareNodes = faShareNodes;

  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() source?: string;
  @Input() mid!: string;
  @Input() nid!: string;
  @Input() field_media_tags?: string;
  @Input() image!: string;
  @Input() logotype?: string;
  @Input() field_media_oembed_video?: any;
  @Input() field_comments?: string;
  @Input() routerLink?: any;
  @Input() type?: string;
  @Input() channelAuthor?: string;
  @Input() field_duration?: string;
  @Input() uid?: string;
  @Input() view_media?: string;
  @Input() view_node?: any;



  constructor(public uploadService: UploadService) {
  }

  refresh() {
    let titleWords = this.title.split(' ');
    this.title =  (titleWords.length > 5) ? titleWords.slice(0, 6).join(' ') + '...' : titleWords.join(' ');
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
  }

  popup : any = false

  copyUrl(val: string, title: string) {
    if (this.field_media_oembed_video.slice(0,4) == "http") {
      navigator.clipboard.writeText(val);
      this.popup = true
      setTimeout(() => { this.popup = false; }, 500);
      console.log(this.field_media_oembed_video.slice(0,4))
    } else {
      navigator.clipboard.writeText("www.nomedosite" + val);
      this.popup = true
      setTimeout(() => { this.popup = false; }, 500);
      console.log(this.view_node)
    }

    //window.alert("Share " + title)
  }

}
