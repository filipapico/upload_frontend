import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Categories, Playlist, Playlists} from "../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists?: Playlists[] = [];
  playlist?: Playlist[] = [];
  categories?: Categories[];
  id?: any = ""


  constructor(private route: ActivatedRoute, private uploadService: UploadService,) {
    // this.id = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.getPlaylists(this.id).subscribe((playlists) => {
      this.playlists = playlists;
    });
    this.uploadService.getPlaylist(this.id).subscribe((playlist: any) => {
      this.playlist = playlist;
    });
    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  categorySelected(tid: any) {
    this.uploadService.getPlaylists(tid).subscribe((playlists) => {
      this.playlists = playlists;
      console.log(tid)
    });
  }

}

