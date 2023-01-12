import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Categories, Channels} from "../interfaces";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

  categories?: Categories[]; //array of all the categories
  channels?: Channels[];

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.uploadService.getChannels().subscribe((channels) => {
        this.channels = channels;
      }
    )

    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  targetChannels(id: string){
    this.uploadService.getCategoryChannels(id).subscribe((channels: Channels[]) => {
      this.channels = channels;
    })

  }
}
