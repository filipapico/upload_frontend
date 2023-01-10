import {Component, Input} from '@angular/core';
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faShareNodes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  faBookmark= faBookmark;
  faShareNodes = faShareNodes;

  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() source?: string;
  @Input() mid!: string;
  @Input() field_media_tags?: string;
  @Input() image!: string;
  @Input() logotype?: string;
  @Input() field_media_oembed_video?: string;
  @Input() field_comments?: string;
  @Input() routerLink?: any;




}
