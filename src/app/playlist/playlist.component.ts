import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

import {retry} from "rxjs";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit{
  playlist? : Playlist[];
  id : number;

  constructor(private route: ActivatedRoute, private uploadService: UploadService, private sanitizer : DomSanitizer) {
    this.id = route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.uploadService.getPlaylist(this.id).subscribe((playlist : any) => {
      this.playlist = playlist.map((v : any) => {
        let video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + v.field_media_oembed_video.split("?v=")[1]);
        return {...v,
          video_url: video_url
        };
      });
    })
  }
}
