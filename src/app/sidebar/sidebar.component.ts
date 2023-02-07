import {Component} from '@angular/core';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isActive: boolean[] = [false, false];

  constructor(public uploadService: UploadService) {
  }

  toggleActive(i: number){
    this.isActive = [false, false];
    this.isActive[i] = true;
  }


}
