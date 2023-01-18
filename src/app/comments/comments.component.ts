import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @Input() gravatar?: string;
  @Input() username?: string;
  @Input() created?: string;
  @Input() comment_body?: string;
  @Input() contentID?: number;
  @Input() entityType?: string;
  @Input() email?: string;



}
