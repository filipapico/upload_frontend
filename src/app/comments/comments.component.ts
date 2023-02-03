import {Component, Input} from '@angular/core';
import {faFlag, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {UploadService} from "../upload.service";
import {Comment} from "../interfaces";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  faFlag = faFlag;
  faTimesCircle = faTimesCircle;

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
    this.uploadService.postComment(this.entityType, this.contentID, comment.username, comment.email, comment.comment ).subscribe(() => {
      //callback refreshComments
      this.refreshComments();
    });
  }

  addCommentReport() {
    this.uploadService.postReport(this.index_cid[1], this.field_reason).subscribe((data) => {
    })
    this.Closepopup()
  }

  show = false;
  index_cid: [number, string] = [0,""];
  field_reason: string = "";

  Openpopup(index: any, cid: string) {
    this.index_cid = [index, cid];
    this.show = true;
    // console.log(this.index_cid[1] === cid)
  }

  Closepopup() {
    this.show = false
  }
}
