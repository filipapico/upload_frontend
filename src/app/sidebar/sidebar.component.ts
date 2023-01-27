import {Component} from '@angular/core';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public uploadService: UploadService) {
  }


}
