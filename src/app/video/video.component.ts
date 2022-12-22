import { Component, Input, OnInit } from '@angular/core';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input() name!: string;
  @Input() created!: string;
  @Input() mid!: string;
  @Input() field_media_tags!: string;
  @Input() thumbnail_target_id!: string;

  constructor(private upload : UploadService) { }

}
