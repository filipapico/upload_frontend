import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) {
  }

  getLatestVideos() {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos");
  }

  getPlaylist(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

}
