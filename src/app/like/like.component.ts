import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid} from "@fortawesome/free-solid-svg-icons";
import {UploadService} from "../upload.service";
import {Likes} from "../interfaces";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit, OnChanges {
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

  likes!: Likes[]
  dislikes!: Likes[]
  iconLikeActive = false
  iconDislikeActive = false

  constructor(public uploadService: UploadService) {
  }

  //OnChanges interface detects changes to input properties
  //method ngOnChanges() is called whenever there is a change in id_video
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id_video && changes['id_video']) {
      this.refresh();
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  addFlagToVideo(flagtype: string, idVideo: string) {
    this.uploadService.postFlag(flagtype,idVideo).subscribe((data) => {
      this.refresh();
    })
  }

  refresh() {
    this.uploadService.getLikes(this.id_video).subscribe((likes) => {
      this.likes = likes
    });
    this.uploadService.getDislikes(this.id_video).subscribe((dislikes) => {
      this.dislikes = dislikes
    });
  }

  toggleLike() {
    this.iconLikeActive = !this.iconLikeActive
  }

  toggleDislike() {
    this.iconDislikeActive = !this.iconDislikeActive
  }

}
