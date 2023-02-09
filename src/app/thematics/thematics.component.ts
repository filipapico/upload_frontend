import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags} from "../interfaces";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  thematics!: Thematics[];
  tags!: Tags[];
  idTagSelected!: string;
  pNumThematics: number = 0;
  pNumsThematics!: number[];
  thematicsPerPAge: number = 4 //needs to be according to pagination in the view/rest export set in DRUPAL

  //Tags pagination
  tagActive!: string;
  pNumTags: number = 0;
  visibleTag = false;

  constructor(public uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.idTagSelected = ""
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pNumTags, this.pNumThematics, this.idTagSelected);
    });
    this.refresh(this.pNumTags, this.pNumThematics, this.idTagSelected);
  }

  refresh(pageTags: number, pageThematics: number, id: string) {
    this.idTagSelected = id
    this.pNumThematics = pageThematics
    this.uploadService.getTagsInThematics(pageTags).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getPagination("thematics", this.idTagSelected, this.thematicsPerPAge).subscribe(({pageNumbers}) => {
      this.pNumsThematics = pageNumbers
      this.pNumThematics = pageThematics
    })

    this.uploadService.getThematicsByTag(id, this.pNumThematics).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }

  //Tags pagination
  toggleVisibleTag(): void {
    this.visibleTag = !this.visibleTag;
  }

  getMoreTags(p: number) {
    if (this.tags.length <= 10) {
      p++
      this.pNumTags = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
    }
  }

  getLessTags(p: number) {
    if (this.tags.length <= 10) {
      p--
      this.pNumTags = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
      this.toggleVisibleTag()
    }
  }
}
