import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() source?: string;
  @Input() mid!: string;
  @Input() field_media_tags!: string;
  @Input() image!: string;
  @Input() logotype?: string;
  @Input() field_media_oembed_video?: string;
  @Input() field_comments?: string;


    getBackgroundImage(id: string){
      return `https://dev-project-upskill2-grupo4v2.pantheonsite.io${id}`;
    }

}
