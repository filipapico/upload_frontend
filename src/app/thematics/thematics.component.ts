import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags} from "../interfaces";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent {
  thematics!: Thematics[]
  tags!: Tags[]

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
      console.log(this.thematics)
    })

    this.uploadService.getAllTags().subscribe((tags) => {
      this.tags = tags
      console.log(this.tags)
    })
  }
}
