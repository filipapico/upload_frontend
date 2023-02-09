import {Component} from '@angular/core';
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";

@Component({
  selector: 'app-myfavorites',
  templateUrl: './myfavorites.component.html',
  styleUrls: ['./myfavorites.component.scss']
})
export class MyfavoritesComponent {
  favorites_list?: Video[];

  constructor(public uploadService: UploadService) {
  }

  refresh() {
    if (this.uploadService.favorites.length > 0)
      this.uploadService.getFavorites().subscribe((favoritos) => {
        this.favorites_list = favoritos;
      });
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh(); //triggered when the language changes
    });
    this.refresh();
  }

}


