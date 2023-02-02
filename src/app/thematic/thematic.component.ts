import {Component} from '@angular/core';
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
  thematicSlug!: string

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
    this.id_thematic = route.snapshot.params['nid']
  }

  refresh() {
    this.uploadService.getThematicDetails(this.id_thematic).subscribe((thematicDetails) => {
      this.thematicDetails = thematicDetails
    })

    this.uploadService.getThematicLinks(this.id_thematic).subscribe((thematicLinks) => {
      this.thematicLinks = thematicLinks.field_thematic_links
    })
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    })
    this.route.params.subscribe(params => {
      let slug = params['nid']
      console.log("slug",slug)
      this.uploadService.getContentBySlug("thematic", slug).subscribe((data: any) => {
        this.id_thematic = data.nid[0].value
        console.log(this.id_thematic)
        this.refresh();
      })
    })
  }

  getVideos(id_tag: string) {
    this.uploadService.getVideosByTag(id_tag, 0).subscribe((thematicVideos) => {
      this.thematicVideos = thematicVideos
    })
  }
}
