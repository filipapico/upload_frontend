import { Component } from '@angular/core';
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";

@Component({
  selector: 'app-myfavorites',
  templateUrl: './myfavorites.component.html',
  styleUrls: ['./myfavorites.component.scss']
})
export class MyfavoritesComponent {
  favorites_list? : Video[];

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getFavorites().subscribe((favoritos) => {
      this.favorites_list = favoritos
      console.log(this.favorites_list)
    });

  }

}


