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
  visibleThematics = false;
  visiblePagination = true;
  active = false;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private uploadService: UploadService) {
  }

  refresh() {
    this.uploadService.getTagsInThematics(0).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getThematics(0).subscribe((thematics) => {
      this.thematics = thematics
    })
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
  }

  toggleVisible(): void {
    this.visible = !this.visible;
  }

  toggleVisibleThematics(): void {
    this.visibleThematics = !this.visibleThematics;
  }

  toggleActive(): void {
    this.active = !this.active
  }

  togglePagination(): void {
    this.visiblePagination = !this.visiblePagination
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
      this.toggleVisibleThematics()
    }
  }

  getThematicsByTag(id: string) {
   // console.log("before", this.visiblePagination)
    this.togglePagination()
    // console.log("after", this.visiblePagination)
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }
}



