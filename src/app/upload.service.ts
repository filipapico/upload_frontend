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


const BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";

const HEADERS = new HttpHeaders({
  'X-CSRF-Token': 'VQrAx6wI4cv-J3BdqLRhIbN5gfUUCGf9sZnR_teei2U',
  'Accept': 'application/vnd.api+json'
});

const LIKE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/entity/flagging";

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  currentLanguage: string = '/en/';

  favorites: string[] = [] = JSON.parse(localStorage.getItem("favorites") || "[]");

  constructor(public http: HttpClient) {
  }

  //MULTILINGUAL
  switchLanguage(idValue: string) {
    this.currentLanguage = (idValue == 'portuguese') ? "/pt-pt/" : "/en/";
    this.callback_list.forEach((callback? : Function) => callback?.())
  };

  callback_list : [Function?] = []


  /*  checkCurrentLanguage(): Observable<string> {
      // window.location.reload();
      return new Observable((observer) => {
        try {
          observer.next(`${this.currentLanguage}`);
        } catch (error) {
          observer.error(error);
        } finally {
          observer.complete();
        }
      });
    };*/

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
  getToken() {
    let token = this.http.get(BASE_URL + "/session/token");
    return token;
  }

  //REPORT COMMENTS
  postReport(comment_id : string, reason : string) {
    return this.http.post(LIKE_URL, {
      "entity_id": [comment_id],
      "entity_type": ["comment"],
      "field_reason": [reason],
      "flag_id": [{"target_id": "report_comments", "target_type": "flag"}],
      "uid": ["0"]
    }, {headers: HEADERS, })
  }

  //LIKES & DISLIKES
  postFlag(urlLike: string, bodyLike: {}, headersLike: any) {
    return this.http.post(LIKE_URL, bodyLike, headersLike)
  }

  getLikes(id_video: string) {
    return this.http.get<Likes[]>(BASE_URL + "/api/like/videos/" + id_video)
  }

  getDislikes(id_video: string) {
    return this.http.get<Likes[]>(BASE_URL + "/api/dislike/videos/" + id_video)
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
  getChannelVideos(id: any) {
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
