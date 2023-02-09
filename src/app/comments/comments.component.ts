import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {faFlag, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {UploadService} from "../upload.service";
import {Comment} from "../interfaces";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {
  faFlag = faFlag;
  faTimesCircle = faTimesCircle;
  message = false;

  @Input() gravatar?: string;
  @Input() username?: string;
  @Input() created?: string;
  @Input() comment_body?: string;
  @Input() contentID!: number;
  @Input() entityType!: string;
  @Input() email?: string;
  @Input() entityComments: Comment[] = [];


  constructor(public uploadService: UploadService) {
  }

  // Deteta mudanca nos inputs (quando a <app-comments> esta usada em outro component,
  // é preciso detetar mudança no contentID
  ngOnChanges(changes: SimpleChanges): void {
    if (this.contentID && changes['contentID']) {
      this.refreshComments();
    }
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refreshComments();
    });
    this.refreshComments();
  }

  refreshComments() {
    //getting comments of that specific media || node:
    this.uploadService.getComments(this.entityType, this.contentID).subscribe((comments) => {
      this.entityComments = comments;
    })
  }

  onCommentSubmit(comment: { username: string, email: string, comment: string }){
    if (comment.username && comment.email && comment.email.includes('@') && comment.comment) {
      this.uploadService.postComment(this.entityType, this.contentID, comment.username, comment.email, comment.comment ).subscribe(() => {
        //callback refreshComments
        this.refreshComments();
      });
    } else {
      window.alert("Error: Please fill all the required fields.")
    }
  }

  addCommentReport() {
    if (this.field_reason.length > 5) {
      this.uploadService.postReport(this.index_cid[1], this.field_reason).subscribe((data) => {
      })
      this.Closepopup()
      this.message = true;
      setTimeout(() => { this.message = false; }, 1500);
      this.field_reason = "";
    } else {
      window.alert("Your report message should have more than 5 characters, try again...")
    }
  }

  show = false;
  index_cid: [number, string] = [0,""];
  field_reason: string = "";

  Openpopup(index: any, cid: string) {
    this.index_cid = [index, cid];
    this.show = true;
  }

  Closepopup() {
    this.show = false
  }
}
