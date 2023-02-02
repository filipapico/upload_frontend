import {Component, Input} from '@angular/core';
import {UploadService} from "../upload.service";
import {Tags} from "../interfaces";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tagsVideos!: Tags[]

  @Input() type!: string

  constructor(private uploadService: UploadService) {
  }

  refresh() {
    this.uploadService.getTagsInVideos().subscribe((tagsVideos) => {
      this.tagsVideos = tagsVideos
    })
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
  }
}
