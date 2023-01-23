import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories, Channels, Playlists, Thematic, Tags, ThematicLinks, Video, Thematics, Comment} from "./interfaces";

const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";
const FLAG_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/entity/flagging";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  favorites: string[] = [] = JSON.parse(localStorage.getItem("favorites") || "[]");

  constructor(public http: HttpClient) {
  }

  getToken() {
    let token = this.http.get(BASE_URL + "/session/token");
    console.log(typeof (token));
    return token;
  }

  postComments(url: string, body: {}, headers: any) {
    return this.http.post(url, body, headers).subscribe((data) => {
      window.location.reload();
      console.log(data);
    });
  }

  postLike(urlLike: string, bodyLike: {}, headersLike: any) {
    return this.http.post(FLAG_URL, bodyLike, headersLike).subscribe((data) => {
    })
  }

  getComments(type: string, id: number) {
    return this.http.get<Comment[]>(BASE_URL + "/api/comments/" + type + "/" + id);
  }


  getCategories() {
    return this.http.get<Categories[]>(BASE_URL + "/api/categories");
  }

  getCategoryChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/categories/channels/" + id);
  }

  getChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/channels/" + id);
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

  getSearchVideos(value: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos/?name=" + value)
  }

  getThematics() {
    return this.http.get<Thematics[]>(BASE_URL + "/api/thematics")
  }

  getTagsInThematics(pNum: number) {
    return this.http.get<Tags[]>(BASE_URL + "/api/tags-thematics?page=" + pNum)
  }

  getThematicsByTag(id: string) {
    return this.http.get<Thematics[]>(BASE_URL + "/api/thematics/" + id)
  }

  getThematicDetails(id: string) {
    return this.http.get<Thematic[]>(BASE_URL + "/api/thematic/" + id)
  }

  getThematicLinks(id: string) {
    return this.http.get<ThematicLinks>(BASE_URL + "/node/" + id + "?_format=json")
  }

  getVideosByTag(id_tag: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/videos-tags/" + id_tag)
  }

  getPlaylists(id: string) {
    return this.http.get<Playlists[]>(BASE_URL + "/api/playlists/" + id);
  }

  getPlaylist(id: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

  getFavorites() {
    let ids = this.favorites.join(",");
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos/" + ids);
  }

  //FAVORITE VIDEO
  isFavoriteVideo(id: string) {
    return this.favorites.includes(id);
  }

  toggleFavoriteVideo(id: string) {
    if (this.isFavoriteVideo(id)) {
      //remove id from favorites
      this.favorites.splice(this.favorites.indexOf(id), 1)
    } else {
      //add id to favorites
      this.favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  //FAVORITE CHANNELS
  favChannel: number[] = [] = JSON.parse(localStorage.getItem("favChannel") || "[]");

  isFavChannel(id: number) {
    return this.favChannel.includes(id);
  }

  toggleFavChannel(id: number) {
    if (this.isFavChannel(id)) {
      //remove id from fav (was in the list and user clicks again > removing)
      this.favChannel.splice(this.favChannel.indexOf(id), 1) //favorite was in the list, deleting it
    } else {
      this.favChannel.push(id); //we push it into the list, wasn't fav yet
    }
    localStorage.setItem("favChannel", JSON.stringify(this.favChannel));//setting favorites item in the localStorage
  }

}
