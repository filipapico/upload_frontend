import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Categories, Playlists} from "../interfaces";
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

  constructor(private route: ActivatedRoute, private uploadService: UploadService,) {
  }

  ngOnInit(): void {
    this.uploadService.getPlaylists(this.id).subscribe((playlists) => {
      this.playlists = playlists;
    });

    this.uploadService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  categorySelected(tid: any) {
    this.uploadService.getPlaylists(tid).subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

}

