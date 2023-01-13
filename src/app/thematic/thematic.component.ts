import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Thematic, ThematicLink} from "../interfaces";
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-thematic',
  templateUrl: './thematic.component.html',
  styleUrls: ['./thematic.component.scss']
})

export class ThematicComponent {
  id!: string
  thematic!: Thematic[]
  thematicLinks!: ThematicLink[]

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
    this.id = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.getThematicDetails(this.id).subscribe((thematic) => {
      this.thematic = thematic
      //console.log("this thematic details", this.thematic)
    })

    this.uploadService.getThematicLinks(this.id).subscribe((thematicLinks) => {
      this.thematicLinks = thematicLinks.field_thematic_links
    })

  }

}
