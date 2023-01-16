import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  constructor(public uploadService: UploadService) {
  }

/*    testComment1 = {
      "entity_id": [{"target_id": 19}],
      "entity_type": [{"value": "node"}],
      "comment_type": [{"target_id": "channel_comments"}],
      "field_name": [{"value": "field_comment"}],
      "field_comment_name": [{"value": "Agathe"}],
      "field_email": [{"value": "agathe@gmail.com"}],
      "subject": [{"value": "Hello World"}],
      "comment_body": [
        {"value": "<p>See you later!</p>", "format": "plain_text"}
      ]
    }*/


  /*  testComment2 = {
    entity_id: [{"target_id": 19}],
    entity_type: [{"value": "node"}],
    comment_type: [{"target_id": "channel_comments"}],
    field_name: [{"value": "field_comment"}],
    name: "",
    mail: "",
    subject: "",
    comment_body: ""
  }*/

  commentUrl = 'https://dev-project-upskill2-grupo4v2.pantheonsite.io/comment';
  tokenValue?: any;

  ngOnInit(): void {
    /*this.uploadService.getToken().subscribe((token) => {
      this.tokenValue = token;
      console.log(this.tokenValue);
    })*/
  }

  customHeaders = new HttpHeaders({
    // 'X-CSRF-Token': JSON.stringify(this.tokenValue),
    'Accept': 'application/vnd.api+json'
  });


  onCommentSubmit(comment: { username: string, email: string, comment: string }) {

   let myComment = {
      "entity_id": [{"target_id": 19}],
      "entity_type": [{"value": "node"}],
      "comment_type": [{"target_id": "channel_comments"}],
      "field_name": [{"value": "field_comment"}],
      "field_comment_name": [{"value": comment.username}],
      "field_email": [{"value": comment.email}],
      "subject": [{"value": ""}],
      "comment_body": [
      {"value": comment.comment, "format": "plain_text"}
    ]
    }
    console.log(myComment);
    this.uploadService.postComments(this.commentUrl, myComment, this.customHeaders);
  }

}
