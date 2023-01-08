import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Channels} from "../interfaces";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

  channels?: Channels[];

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.uploadService.getChannels().subscribe((channels) => {
        this.channels = channels;
      }
    )
  }
}
