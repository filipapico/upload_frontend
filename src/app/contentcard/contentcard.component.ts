import {Component, Input} from '@angular/core';
import {faHeart, faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartFull, faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";
import {faShareNodes} from "@fortawesome/free-solid-svg-icons";
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

  constructor(public uploadService: UploadService) {
  }

  ngOnInit(): void {
    let titleWords = this.title.split(' ');
    (titleWords.length > 5) ? this.title = titleWords.slice(0, 6).join(' ').concat('...') : this.title;
  }


  popup : any = false

  copyUrl(val: string, title: string) {
    navigator.clipboard.writeText(val);
    this.popup = true
    setTimeout(() => { this.popup = false; }, 500);
    //window.alert("Share " + title)
  }

}
