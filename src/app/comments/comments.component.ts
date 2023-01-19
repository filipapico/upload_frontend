import {Component, Input} from '@angular/core';
import {faFlag} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  faFlag = faFlag;

  @Input() gravatar?: string;
  @Input() username?: string;
  @Input() created?: string;
  @Input() comment_body?: string;
  @Input() contentID?: number;
  @Input() entityType?: string;
  @Input() email?: string;




}
