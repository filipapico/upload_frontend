import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit{
  playlist? : Playlist[];
  id : number;

  constructor(private route: ActivatedRoute, private uploadService: UploadService) {
    this.id = route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.uploadService.getPlaylist(this.id).subscribe((playlist : any) => {
      this.playlist = playlist;
    })
  }
}
