import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  Categories,
  Channels,
  Playlists,
  Thematic,
  Tags,
  ThematicLinks,
  Video,
  Thematics,
  Comment,
  Likes
} from "./interfaces";
import {Observable} from "rxjs";
import * as events from "events";

// const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";
let currentLanguage = "/en";
let BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/en";

const LIKE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/entity/flagging";

/*USED FOR TESTING
let BODYLIKE = {
  "entity_id":["87"],
  "entity_type":["media"],
  "flag_id":[{"target_id": "like_videos","target_type": "flag"}],
  "uid": ["0"]
}*/

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  favorites: string[] = [] = JSON.parse(localStorage.getItem("favorites") || "[]");

  constructor(public http: HttpClient) {
  }

  switchLanguage(idValue: string) {
    // (currentLanguage == "/en") ? BASE_URL += "/pt-pt" : BASE_URL += "/en";
   if(idValue == 'portuguese'){
     BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/pt-pt";
     currentLanguage = "/pt-pt"
   } else {
     BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/en";
     currentLanguage = "/en"
   }
    console.log(BASE_URL);

    // this.refreshLanguage(idValue);
  };

/*  refreshLanguage(idValue: string){
    // @ts-ignore
    document.getElementById(idValue).classList.add('active');
    console.log(BASE_URL);
  }*/



  //VIDEOS
  getVideo(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/allvideos/" + id);
  }

  getLatestVideos(pNum: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos?page=" + pNum);
  }

  getSearchVideos(value: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/latest-videos/?name=" + value)
  }

  getTagsInVideos() {
    return this.http.get<Tags[]>(BASE_URL + "/api/tags-videos")
  }

  // TOKEN
  // Save the token value in a constant? Tiago's suggestion... (why is not being used now?!!?)
  getToken() {
    let token = this.http.get(BASE_URL + "/session/token");
    console.log(typeof (token));
    return token;
  }

  //LIKES & DISLIKES
  postLike(urlLike: string, bodyLike: {}, headersLike: any) {
    return this.http.post(LIKE_URL, bodyLike, headersLike)
  }

  getLikes(id_video: string) {
    return this.http.get<Likes[]>(BASE_URL + "/api/like/videos/" + id_video)
  }

  //COMMENTS
  postComments(url: string, body: {}, headers: any) {
    return this.http.post(url, body, headers);
  }

  getComments(type: string, id: number) {
    return this.http.get<Comment[]>(BASE_URL + "/api/comments/" + type + "/" + id);
  }

  //CATEGORIES
  getCategories() {
    return this.http.get<Categories[]>(BASE_URL + "/api/categories");
  }

  //CHANNELS
  getChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/channels/" + id);
  }

  getCategoryChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/categories/channels/" + id);
  }

  // QUESTION Maybe update all ids to type string? Since our APIs always return strings...
  getChannelVideos(id: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/channel/" + id);
  }

  //THEMATICS
  getThematics(pNum: number) {
    return this.http.get<Thematics[]>(BASE_URL + "/api/thematics?page=" + pNum)
  }

  getTagsInThematics(pNum: number) {
    return this.http.get<Tags[]>(BASE_URL + "/api/tags-thematics?page=" + pNum)
  }

  getThematicsByTag(id: string) {
    return this.http.get<Thematics[]>(BASE_URL + "/api/thematics-tag/" + id)
  }

  getThematicDetails(id: string) {
    return this.http.get<Thematic[]>(BASE_URL + "/api/thematic/" + id)
  }

  getThematicLinks(id: string) {
    return this.http.get<ThematicLinks>(BASE_URL + "/node/" + id + "?_format=json")
  }

  getVideosByTag(id_tag: string, pNum: number) {
    return this.http.get<Video[]>(BASE_URL + "/api/videos-tag/" + id_tag + "?page=" + pNum)
  }

  //PLAYLISTS
  getPlaylists(id: string, pNum: any) {
    return this.http.get<Playlists[]>(BASE_URL + "/api/playlists/" + id + "?page=" + pNum);
  }

  getPlaylist(id: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

  //FAVORITES
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
