import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {

  id: number;
  video?: Video;

  constructor(private route: ActivatedRoute, public uploadService: UploadService) {
    this.id = route.snapshot.params['mid'];
  }

  ngOnInit(): void {
    this.uploadService.getVideo(this.id).subscribe((video) => {
      this.video = video[0];
      console.log(this.video);

    })
  }

}
