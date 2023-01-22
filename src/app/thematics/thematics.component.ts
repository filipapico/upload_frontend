import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags, Thematic} from "../interfaces";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent {
  thematics!: Thematics[]
  tags!: Tags[]
  tagsShowing!: number

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })

    this.uploadService.getTagsInThematics().subscribe((tags) => {
      this.tags = tags
    })
  }


  getThematicsByTag(id: string) {
    if (this.tagsShowing < 10) {
      this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
        this.thematics = thematicTags
      })
      this.tagsShowing++
    } else {

    }
  }
}
