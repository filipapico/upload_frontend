import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-thematic',
  templateUrl: './thematic.component.html',
  styleUrls: ['./thematic.component.scss']
})

export class ThematicComponent {
  id!: number

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['nid']
    console.log("this id thematic", this.id)
  }


}
