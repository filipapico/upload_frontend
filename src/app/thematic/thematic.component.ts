import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Thematic, ThematicLink, Video} from "../interfaces";
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-thematic',
  templateUrl: './thematic.component.html',
  styleUrls: ['./thematic.component.scss']
})

export class ThematicComponent {
  id_thematic!: string
  thematicDetails!: Thematic[]
  thematicLinks!: ThematicLink[]
  thematicVideos!: Video[]

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
    this.id_thematic = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.getThematicDetails(this.id_thematic).subscribe((thematicDetails) => {
      this.thematicDetails = thematicDetails
      console.log(this.thematicDetails[0].tid)
    })

    this.uploadService.getThematicLinks(this.id_thematic).subscribe((thematicLinks) => {
      this.thematicLinks = thematicLinks.field_thematic_links
    })

  }

  getVideos(id_tag: string) {
    this.uploadService.getVideosByTag(id_tag, 0).subscribe((thematicVideos) => {
      this.thematicVideos = thematicVideos
    })
  }
}
