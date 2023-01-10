import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

import {elementAt, findIndex, fromEvent, retry} from "rxjs";
import {Playlist, Playlists} from "../interfaces";
import * as events from "events";
import {keyframes} from "@angular/animations";



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist?: Playlist[];
  id: number;
  videoplaying : Playlist[] = []

  constructor(private route: ActivatedRoute, private uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.getPlaylist(this.id).subscribe((playlist: any) => {
      this.playlist = playlist.map((v: any) => {
        let video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + v.field_media_oembed_video.split("?v=")[1]);
        return {
          ...v,
          video_url: video_url
        };
      });
    })
  }

  clickVideo() {
    console.log(this.playlist)
  }



}
