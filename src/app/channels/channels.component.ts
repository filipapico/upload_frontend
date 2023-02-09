import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
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
  selectedCategory?: Categories; //we're comparing selectedCategory to a single category in the ngClass (selectedCategory === category)
  channels!: Channels[];
  nid: string = " ";
  categoryPageNumber: number = 0;
  value: any;


  constructor(public uploadService: UploadService) {
  }

  refresh() {
    //getting all channels
    this.uploadService.getChannels(this.nid).subscribe((channels) => {
        this.channels = channels;
      }
    )

    //getting all existing categories in channels:
    this.uploadService.getCategoriesinChannels(this.categoryPageNumber).subscribe((categories) => {
      this.categories = categories;
    })
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
  }

  //clicking on category will filter channels and calls new data from api:
  targetChannels(tid: string) {
    this.uploadService.getChannelsFromCategory(tid).subscribe((channels) => {
      this.channels = channels;
    })
  }

  popup : any = false
  copyUrl(val: string) {
      navigator.clipboard.writeText("https://app-upload.netlify.app" + val.slice(3));
      this.popup = true;
      setTimeout(() => { this.popup = false; }, 900);
      this.value = val;
    }
}
