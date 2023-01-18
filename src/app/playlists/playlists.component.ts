import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Categories, Playlists, Video} from "../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists?: Playlists[] = [];
  categories?: Categories[];
  id?: any = ""
  favorites_list? : Video[];


  constructor(private route: ActivatedRoute, private uploadService: UploadService,) {
  }

  ngOnInit(): void {
    this.uploadService.getPlaylists(this.id).subscribe((playlists) => {
      this.playlists = playlists;
    });

    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.uploadService.getFavorites().subscribe((favoritos) => {
      this.favorites_list = favoritos
      console.log(this.favorites_list)
    });
  }

  categorySelected(tid: any) {
    this.uploadService.getPlaylists(tid).subscribe((playlists) => {
      this.playlists = playlists;
      console.log(tid)
    });
  }
}

