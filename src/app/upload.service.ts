import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories, Channels, Playlists, Tags, Thematic, Video} from "./interfaces";

const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) {
  }

  getCategories() {
    return this.http.get<Categories[]>(BASE_URL + "/api/categories");
  }

  getCategoryChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/categories/channels/" + id);
  }

  getChannels() {
    return this.http.get<Channels[]>(BASE_URL + "/api/channels");
  }

  //
  // QUESTION Maybe update all ids to type string? Since our APIs always return strings...
  getChannelVideos(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/channel/" + id);
  }

  getVideo(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos/" + id);
  }

  getLatestVideos(pNum: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos?page=" + pNum);
  }

  getThematics() {
    return this.http.get<Thematic[]>(BASE_URL + "/api/thematics")
  }

  getThematicsTags() {
    return this.http.get<Tags[]>(BASE_URL + "/api/thematics")
  }

  getThematicDetails(id: string) {
    return this.http.get<Thematic[]>(BASE_URL + "/api/thematic/" + id)
  }

  getPlaylists(id: string) {
    return this.http.get<Playlists[]>(BASE_URL + "/api/playlists/" + id);
  }

  getPlaylist(id: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

}
