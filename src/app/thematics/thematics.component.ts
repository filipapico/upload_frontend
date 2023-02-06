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
  tagIdSelected!: string
  pNumThematics: number = 0;
  pNumsThematics!: number[];

  //TAGS PAGINATION - TO BE IMPROVED
  pNumTags: number = 0;
  visibleTag = false;
  visibleTagPagination = true;

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.tagIdSelected = ""
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pNumTags, this.pNumThematics, this.tagIdSelected);
    });
    this.refresh(this.pNumTags, this.pNumThematics, this.tagIdSelected);
  }

  refresh(pageTags: number, pageThematics: number, id: string) {
    this.tagIdSelected = id
    this.pNumThematics = pageThematics
    console.log(this.pNumThematics)
    this.uploadService.getTagsInThematics(pageTags).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getCount("thematics", this.tagIdSelected).subscribe(({
                                                                              itemsPerPage,
                                                                              numberOfPages,
                                                                              pageNumbers,
                                                                              pagesCount
                                                                            }) => {
      this.pNumsThematics = pageNumbers
      this.pNumThematics = pageThematics
    })

    this.uploadService.getThematicsByTag(id, this.pNumThematics).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })

    /*this.uploadService.getThematics(pageThematics).subscribe((thematics) => {
      this.thematics = thematics
    })*/
  }

  /*getThematicsByTag(id: string) {
    this.tagIdSelected = id
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
    this.toggleTagPagination()
  }*/

  //TAGS PAGINATION - TO BE IMPROVED
  toggleVisibleTag(): void {
    this.visibleTag = !this.visibleTag;
  }

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
