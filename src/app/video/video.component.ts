import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input() name!: string;
  @Input() created!: string;
  @Input() mid?: string;
  @Input() field_media_tags!: string;
  @Input() thumbnail__target_id!: string;
  @Input() field_media_oembed_video?: string;
  @Input() field_comments?: string;
  @Input() field_categories?: string


}
