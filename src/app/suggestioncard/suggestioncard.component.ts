import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-suggestioncard',
  templateUrl: './suggestioncard.component.html',
  styleUrls: ['./suggestioncard.component.scss']
})
export class SuggestioncardComponent {

  @Input() type?: any;
  @Input() title!: string;
  @Input() field_thematic_header_image?: string
  @Input() field_thematic_thumbnail?: string
  @Input() uid?: string
  @Input() routerLink?: any
}
