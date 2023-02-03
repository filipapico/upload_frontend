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
  pageNumber: number = 0;
  pageNumbers!: number[];
  //TAGS PAGINATION - TO BE IMPROVED
  tagPageNumber: number = 0;
  visibleTag = false;
  activeTag = false;
  visibleTagPagination = true;


  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh(this.pageNumber);
    });
    this.refresh(this.pageNumber);
  }

  refresh(page: number) {
    this.uploadService.getTagsInThematics(page).subscribe((tags) => {
      this.tags = tags
    })

    this.uploadService.getThematics(page).subscribe((thematics) => {
      this.thematics = thematics
    })

    this.uploadService.getCount("thematics").subscribe((pagesCount) => {
      this.pagesCount = pagesCount
      let numberOfThematics = parseInt(this.pagesCount[0].nid)
      const itemsPerPage = 6
      let numberOfPages = Math.ceil(numberOfThematics / itemsPerPage)
      let pageNumbers = new Array(numberOfPages)
      for (let i = 0; i < numberOfPages; i++) {
        pageNumbers[i] = i
      }
      this.pageNumbers = pageNumbers
      this.pageNumber = page
    })
  }

  //TAGS PAGINATION - TO BE IMPROVED
  toggleVisibleTag(): void {
    this.visibleTag = !this.visibleTag;
  }

  getThematicsByTag(id: string) {
    this.toggleTagPagination()
    this.uploadService.getThematicsByTag(id).subscribe((thematicTags) => {
      this.thematics = thematicTags
    })
  }

  toggleTagPagination(): void {
    this.visibleTagPagination = !this.visibleTagPagination
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
      this.toggleVisibleTag()
    }
  }
}
