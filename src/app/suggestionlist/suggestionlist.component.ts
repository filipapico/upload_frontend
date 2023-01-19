import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestionlist',
  templateUrl: './suggestionlist.component.html',
  styleUrls: ['./suggestionlist.component.scss']
})
export class SuggestionlistComponent {


  @Input() listTitle?: any
  @Input() listThumbnail!: string
  @Input() listElement!:string
  @Input() id_element!: string

}
