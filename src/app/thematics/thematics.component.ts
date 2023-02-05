import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Thematics, Tags, Thematic, PagesCount} from "../interfaces";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  thematics!: Thematics[];
  tags!: Tags[];
  pagesCount!: PagesCount[];
  pageNumberThematics: number = 0;
  pageNumbersThematics!: number[];
  //TAGS PAGINATION - TO BE IMPROVED
  pageNumberTags: number = 0;
  visibleTag = false;
  activeTag = false;
  visibleTagPagination = true;
  test!: any

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pageNumberTags, this.pageNumberThematics);
    });
    this.refresh(this.pageNumberTags, this.pageNumberThematics);
  }

  refresh(pageTags: number, pageThematics: number) {
    this.uploadService.getTagsInThematics(pageTags).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getThematics(pageThematics).subscribe((thematics) => {
      this.thematics = thematics
    })

    //TESTING - NOT BEING USED
    this.test = this.uploadService.getCountTest("thematics")
    console.log("test", this.test)


    this.uploadService.getCount("thematics").subscribe((pagesCount) => {
      this.pagesCount = pagesCount
      let numberOfThematics = parseInt(this.pagesCount[0].nid)
      const itemsPerPage = 6
      let numberOfPages = Math.ceil(numberOfThematics / itemsPerPage)
      let pageNumbers = new Array(numberOfPages)
      for (let i = 0; i < numberOfPages; i++) {
        pageNumbers[i] = i
      }
      this.pageNumbersThematics = pageNumbers
      this.pageNumberThematics = pageThematics
    })
  }

  getThematicsByTag(id: string) {
    this.toggleTagPagination()
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
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
