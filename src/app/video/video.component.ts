import {Component, Input,} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
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
  @Input() thumbnail__target_id!: string;
  @Input() field_media_oembed_video?: string;

  constructor(private route: ActivatedRoute, private uploadService: UploadService, private sanitizer : DomSanitizer) {
  }


}
