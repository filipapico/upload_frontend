import {Component, Input} from '@angular/core';
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as faThumbsUpSolid} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown as faThumbsDownSolid} from "@fortawesome/free-solid-svg-icons";
import {UploadService} from "../upload.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {
  faThumbsUp = faThumbsUp;
  faThumbsUpSolid = faThumbsUpSolid;
  faThumbsDown = faThumbsDown;
  faThumbsDownSolid = faThumbsDownSolid;

  @Input() id_video!: string

  body: {} = {
    "entity_id": [this.id_video],
    "entity_type": ["media"],
    "flag_id": [{"target_id": "like_videos", "target_type": "flag"}],
    "uid": ["0"]
  }

  constructor(private uploadService: UploadService) {
  }


  addlikeToVideo(urlLike: string, bodyLike: {}, headersLike: any) {
    let likeHeaders = new HttpHeaders({
      'X-CSRF-Token': 'VQrAx6wI4cv-J3BdqLRhIbN5gfUUCGf9sZnR_teei2U',
      'Accept': 'application/vnd.api+json'
    });

    let bodybody: {} = {
      "entity_id": [this.id_video],
      "entity_type": ["media"],
      "flag_id": [{"target_id": "like_videos", "target_type": "flag"}],
      "uid": ["0"]
    }

    this.uploadService.postLike(urlLike, bodybody, likeHeaders)
    console.log(this.id_video)
  }

}
