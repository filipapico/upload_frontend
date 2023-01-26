import {Component, Input} from '@angular/core';
import {faFlag} from "@fortawesome/free-regular-svg-icons";
import {HttpHeaders} from "@angular/common/http";
import {UploadService} from "../upload.service";
import {Comment} from "../interfaces";


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
  @Input() contentID!: number;
  @Input() entityType!: string;
  @Input() email?: string;

  @Input() onSubmit?: Function;

  @Input() entityComments: Comment[] = [];


  constructor(public uploadService: UploadService) {
  }

  commentUrl = 'https://dev-project-upskill2-grupo4v2.pantheonsite.io/comment';
  tokenValue?: any;

  ngOnInit(): void {
    this.refreshComments();
  }

  onCommentSubmit(comment: { username: string, email: string, comment: string }) {

    /*    this.uploadService.getToken().subscribe((token) => {
          this.tokenValue = token;
          console.log(this.tokenValue);
        });*/

    let customHeaders = new HttpHeaders({
      // 'X-CSRF-Token': JSON.stringify(this.tokenValue),
      'Accept': 'application/vnd.api+json'
    });

    let commentBody;
    if (this.entityType == "node") {
      commentBody = {
        "entity_id": [{"target_id": this.contentID}],
        "entity_type": [{"value": "node"}],
        "comment_type": [{"target_id": "channel_comments"}],
        "field_name": [{"value": "field_comment"}],
        "field_comment_name": [{"value": comment.username}],
        "field_email": [{"value": comment.email}],
        "comment_body": [
          {"value": comment.comment, "format": "plain_text"}
        ]
      }
    } else {
      commentBody = {
        "entity_id": [{"target_id": this.contentID}],
        "entity_type": [{"value": "media"}],
        "comment_type": [{"target_id": "media_comments"}],
        "field_name": [{"value": "field_comments"}],
        "field_comment_name_media": [{"value": comment.username}],
        "field_media_email": [{"value": comment.email}],
        "comment_body": [
          {"value": comment.comment, "format": "plain_text"}
        ]
      }
    }
    this.uploadService.postComments(this.commentUrl, commentBody, customHeaders).subscribe(() => {
      this.refreshComments();
    });
  }

  refreshComments() {
    //getting comments of that specific media || node:
    this.uploadService.getComments(this.entityType, this.contentID).subscribe((comments) => {
      this.entityComments = comments;
    })
  }
}
