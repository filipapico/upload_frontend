import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Categories, Playlists} from "../interfaces";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists?: Playlists[] = [];
  categories?: Categories[];
  listTid? = [];

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getPlaylists().subscribe((playlists) => {
      this.playlists = playlists;
    });
    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  categorySelected(tid: any) {
    console.log(tid)
    if (this.playlists) {
      this.playlists.forEach((playlist) => {
        if (playlist.tid === tid){
          tid.push(this.listTid)
        }
        console.log(this.listTid)
      })
    }
  }

}

