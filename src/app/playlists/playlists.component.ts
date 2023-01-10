import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Playlists} from "../interfaces";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists?: Playlists[] = [];

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.uploadService.getPlaylists().subscribe((playlists) => {
      this.playlists = playlists;
    });
  }
}
