import {Component, Input} from '@angular/core';
import {UploadService} from "../upload.service";
import {Tags, Thematics} from "../interfaces";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  thematics!: Thematics[]

  @Input() list!: Tags[]
  @Input() name!: string
  @Input() test!: string

  constructor(private uploadService: UploadService) {
  }

  getThematicsByTag(id: string) {
    this.uploadService.getThematicsByTag(id).subscribe((thematicTag) => {
      this.thematics = thematicTag
    })
  }
}
