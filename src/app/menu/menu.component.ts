import {Component} from '@angular/core';
import {faHouse, faBarsStaggered, faClapperboard, faPlay} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  faHouse = faHouse;
  faBarsStaggered = faBarsStaggered;
  faClapperboard = faClapperboard;
  faPlay = faPlay;
  faBookmark = faBookmark;

  constructor( public uploadService: UploadService) {
  }

}
