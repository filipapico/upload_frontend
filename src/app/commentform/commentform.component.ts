import {Component, Input} from '@angular/core';
import {UploadService} from "../upload.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-commentform',
  templateUrl: './commentform.component.html',
  styleUrls: ['./commentform.component.scss']
})
export class CommentformComponent {

  @Input() gravatar?: string;
  @Input() username?: string;
  @Input() created?: string;
  @Input() comment_body?: string;
  @Input() contentID?: number;
  @Input() entityType?: string;


  constructor(public uploadService: UploadService) {
  }

  commentUrl = 'https://dev-project-upskill2-grupo4v2.pantheonsite.io/comment';
  tokenValue?: any;

  ngOnInit(): void {

  }

  //state: guarda comentarios. commentarios acrescentado ao array de comments guardados no state (array de comments)
  //angular volta a fazer render do component sem fazer refresh
  //angular state
  //aceder ao state no FIM do pedido ser feito
  //a variavel do estado fica aqui: nao no Service

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
    if(this.entityType == "node") {
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
    this.uploadService.postComments(this.commentUrl, commentBody, customHeaders);

  }



}
