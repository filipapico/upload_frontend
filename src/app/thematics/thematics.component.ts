import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags, Thematic} from "../interfaces";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  thematics!: Thematics[];
  tags!: Tags[];
  pageNumber: number = 0;
  visible = false;

  constructor(private uploadService: UploadService) {
  }

  toggleShow(): void {
    this.visible = !this.visible;
  }

  ngOnInit(): void {
    this.uploadService.getTagsInThematics(0).subscribe((tags) => {
      this.tags = tags
      console.log("pnum inicial", this.pageNumber)
    })

    this.uploadService.getThematics().subscribe((thematics) => {
      this.thematics = thematics
    })
  }

  getMoreTags(p: number) {
    if (this.tags.length <= 10) {
      p++
      this.pageNumber = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
    }
  }

  getLessTags(p: number) {
    if (this.tags.length <= 10) {
      p--
      this.pageNumber = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
      this.toggleShow()
    }
  }

  getThematicsByTag(id: string) {
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }
}



