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
  pageNumberThematics: number = 0;
  pageNumbersThematics!: number[];

  //TAGS PAGINATION - TO BE IMPROVED
  pageNumberTags: number = 0;
  visibleTag = false;
  visibleTagPagination = true;

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.tagIdSelected = ""
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pageNumberTags, this.pageNumberThematics, this.tagIdSelected);
    });
    this.refresh(this.pageNumberTags, this.pageNumberThematics, this.tagIdSelected  );
  }

  getThematicsByTag(id: string) {
    this.tagIdSelected = id
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
    this.toggleTagPagination()
  }

  refresh(pageTags: number, pageThematics: number, id:string) {
    this.tagIdSelected = id
    this.uploadService.getTagsInThematics(pageTags).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getThematics(pageThematics).subscribe((thematics) => {
      this.thematics = thematics
    })

    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })

    this.uploadService.getCount("thematics", this.tagIdSelected).subscribe(({
                                                                          itemsPerPage,
                                                                          numberOfPages,
                                                                          pageNumbers,
                                                                          pagesCount
                                                                        }) => {
      this.pageNumbersThematics = pageNumbers
      this.pageNumberThematics = pageThematics
    })
  }

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
      this.pageNumberTags = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
    }
  }

  getLessTags(p: number) {
    if (this.tags.length <= 10) {
      p--
      this.pageNumberTags = p
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.tags = tags
      })
      this.toggleVisibleTag()
    }
  }
}
