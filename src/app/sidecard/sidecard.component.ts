import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidecard',
  templateUrl: './sidecard.component.html',
  styleUrls: ['./sidecard.component.scss']
})
export class SidecardComponent {

  @Input() sidecard_title!: string
  @Input() listThumbnail!: string
  @Input() listElement!: string
}
