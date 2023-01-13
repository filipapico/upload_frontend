import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {Tags, Thematic} from "../interfaces";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent {
  thematics!: Thematic[];
  tags!: Tags[]

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })

    this.uploadService.getAllTags().subscribe((tags)=>{
      this.tags = tags
    })
  }
}
