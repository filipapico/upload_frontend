import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags, Thematic} from "../interfaces";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  thematics!: Thematics[];
  tags!: Tags[];
  tagPageNumber: number = 0;
  thematicPageNumber: number = 0
  visible = false;
  active = false;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getTagsInThematics(0).subscribe((tags) => {
      this.tags = tags
      console.log("pnum inicial", this.tagPageNumber)
    })

    this.uploadService.getThematics(0).subscribe((thematics) => {
      this.thematics = thematics
    })
  }

  toggleVisible(): void {
    this.visible = !this.visible;
  }

  toggleActive(): void {
    this.active = !this.active
  }

  getMoreTags(p: number) {
    if (this.tags.length <= 10) {
      p++
      this.tagPageNumber = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
    }
  }

  getLessTags(p: number) {
    if (this.tags.length <= 10) {
      p--
      this.tagPageNumber = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
      this.toggleVisible()
    }
  }

  getMoreThematics(p: number) {
    if (this.thematics.length <= 6) {
      p++
      this.thematicPageNumber = p
      this.uploadService.getThematics(p).subscribe((thematics) => {
        this.thematics = thematics
      })
    }
  }

  getLessThematics(p: number) {
    if (this.thematics.length <= 6) {
      p--
      this.thematicPageNumber = p
      this.uploadService.getThematics(p).subscribe((thematics) => {
        this.thematics = thematics
      })
      this.toggleVisible()
    }
  }

  getThematicsByTag(id: string) {
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }
}



