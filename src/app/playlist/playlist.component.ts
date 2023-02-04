import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {Playlist} from "../interfaces";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist?: Playlist[];
  id: any;
  indexVideo: number = 0;

  constructor(private route: ActivatedRoute, private uploadService: UploadService, private sanitizer: DomSanitizer) {
    this.id = route.snapshot.params['nid']
  }

  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    if (!this.id) {
      this.route.params.subscribe((params) => {
        let slug = params['name']
        this.uploadService.getContentBySlug("playlist", slug).subscribe((data: any) => {
          this.id = data.nid[0].value
          this.refresh();
        })
      })
    }
  }

  refresh() {
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

  getVideo(index: any) {
    this.indexVideo = index;
    return this.indexVideo;
  }
}
