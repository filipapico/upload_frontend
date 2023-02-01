import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {faBars} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faBars = faBars;

  constructor(public uploadService: UploadService) {
  }


}
