import {Component, OnInit} from '@angular/core';
import {UploadService} from "../upload.service";
import {Categories, Playlists, Video} from "../interfaces";
import {ActivatedRoute} from "@angular/router";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists?: Playlists[] = [];
  categories?: Categories[];
  id?: any = ""
  pNum: any = 0;
  favorites_list? : Video[];
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;


  constructor(private route: ActivatedRoute, private uploadService: UploadService,) {
  }

  refresh() {
    this.uploadService.getPlaylists(this.id, this.pNum).subscribe((playlists) => {
      this.playlists = playlists;
    });

    this.uploadService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.uploadService.getFavorites().subscribe((favoritos) => {
      this.favorites_list = favoritos
    });
  }


  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    this.refresh();
  }

  categorySelected(tid: any) {
    this.uploadService.getPlaylists(tid, 0).subscribe((playlists) => {
      this.playlists = playlists;
      console.log(tid)
    });
  }

  getPlaylists () {
    this.uploadService.getPlaylists(this.id, this.pNum).subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

  pageSelected(selected: any) {
    if (selected == 'Previous' && this.pNum > 0)    //if prev is clicked, numbers will decrease by 1
      this.pNum--;
    else if (selected == 'Next' && this.playlists?.length == 5 )   //if next is clicked numbers will increase by 1
      this.pNum++;

    this.getPlaylists();
  }

  show = true;

  showMessage(list: any) {
    if (list.length != 0) {
      this.show = false;
      console.log(list)
    }
  }

}

