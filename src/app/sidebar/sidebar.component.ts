import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {faBars, faXmark, faKey} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isActive: boolean[] = [false, true];
  faBars = faBars;
  faXmark = faXmark;
  faKey = faKey;
  isMenuOpen = false;

  constructor(public uploadService: UploadService) {
  }

  toggleActive(i: number){
    this.isActive = [false, false];
    this.isActive[i] = true;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
