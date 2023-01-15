import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestionlist',
  templateUrl: './suggestionlist.component.html',
  styleUrls: ['./suggestionlist.component.scss']
})
export class SuggestionlistComponent {

  @Input() listTitle!: string
  @Input() listThumbnail!: string
  @Input() listElement!:string

}
