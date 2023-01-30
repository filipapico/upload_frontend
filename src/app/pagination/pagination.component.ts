
import {Component, Input} from '@angular/core';
import {UploadService} from "../upload.service";
import {Tags, Thematics} from "../interfaces";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() pageNumber: number = 0
  @Input() list!: string[]
  @Input() type!: string

  constructor(private uploadService: UploadService) {
  }
}
/*
getLess(pageNumber: number) {

}

getMore(p: number) {
  if (this.list.length <= 10) {
    p++
    this.pageNumber = p
    if (this.type == "thematics")
      this.uploadService.getTagsInThematics(p).subscribe((tags) => {
        this.list = tags
      })
  }

}

getMoreTags(p: number) {

}


}
*/
