import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags, Thematic, PagesCount} from "../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  thematics!: Thematics[];
  tags!: Tags[];
  idTagSelected!: string
  pNumThematics: number = 0;
  pNumsThematics!: number[];
  thematicsPerPAge: number = 4 //needs to be according to pagination in the view/rest export set in DRUPAL

  //Tags pagination
  pNumTags: number = 0;
  visibleTag = false;
  visibleTagPagination = true;
  //For testing adding class to active tag
  act: any;

  constructor(private route: ActivatedRoute, public uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.idTagSelected = ""
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pNumTags, this.pNumThematics, this.idTagSelected);
    });
    this.refresh(this.pNumTags, this.pNumThematics, this.idTagSelected);
  }

  refresh(pageTags: number, pageThematics: number, id: string) {
    //this.toggleTest()
    this.idTagSelected = id
    this.pNumThematics = pageThematics
    console.log(this.pNumThematics)
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

/*  toggleTest(): void {
    this.act = !this.act;
    console.log(this.act)
  }*/

  toggleTagPagination(): void {
    this.visibleTagPagination = !this.visibleTagPagination
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
