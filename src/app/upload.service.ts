import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Video} from "./interfaces";

const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) {
  }

  getVideo(id: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos/" + id);
  }


/*
  getAllVideos() {
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos");
  }
*/

  getLatestVideos() {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos");
  }

  getPlaylist(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

}
