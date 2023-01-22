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
  tagsShowing: number = 0
  pNum!: number

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })

    this.uploadService.getTagsInThematics(1).subscribe((tags) => {
      this.tags = tags
    })

    if (this.tagsShowing <11){
    } else {
    }
  }


  getThematicsByTag(id: string) {
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }
}
