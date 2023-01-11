import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Channels, Playlists, Thematic, Video} from "./interfaces";

const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) {
  }

  getChannels() {
    return this.http.get<Channels[]>(BASE_URL + "/api/channels");
  }

  getChannelVideos(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/channel/" + id);
  }

  getVideo(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos/" + id);
  }

  getLatestVideos() {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos?page=" + 0);
  }

  getThematicDetails(id: number) {
    return this.http.get<Thematic>(BASE_URL + "api/thematic/" + id)
  }

  getPlaylists() {
    return this.http.get<Playlists[]>(BASE_URL + "/api/playlists")
  }

  getPlaylist(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

  getThematics() {
    return this.http.get<Thematic[]>(BASE_URL + "/api/thematics")
  }

}
