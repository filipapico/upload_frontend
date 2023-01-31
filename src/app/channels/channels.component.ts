import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Categories, Channels} from "../interfaces";
import {faShareNodes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {
  faShareNodes = faShareNodes;
  categories?: Categories[]; //array of all the categories
  channels?: Channels[];
  nid: string = " ";

  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    this.uploadService.getChannels(this.nid).subscribe((channels) => {
        this.channels = channels;
      }
    )

    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }
/*  ngOnInit(): void {
    this.uploadService.checkCurrentLanguage().subscribe((language)=>{
      console.log(`current language: ${language}`);
      this.currentLanguage = language;
      this.loadPage(this.currentLanguage);
    });
  }

  loadPage(language: any) {
    this.uploadService.getChannels(this.nid, language).subscribe((channels) => {
        this.channels = channels;
      }
    )

    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }*/

  targetChannels(id: string) {
    this.uploadService.getCategoryChannels(id).subscribe((channels: Channels[]) => {
      this.channels = channels;
    })
  }


  // DEPRECATED


  /*  switchChannelLanguage(idValue: string) {
    (idValue == 'portuguese')? this.currentLanguage = "/pt-pt/" :  this.currentLanguage = "/en/";
    this.refresh();
  }*/
}
