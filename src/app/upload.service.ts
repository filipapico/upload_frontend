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
  Likes, PagesCount
} from "./interfaces";


let BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";
const LIKE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io/entity/flagging";



const HEADERS = new HttpHeaders({
  'X-CSRF-Token': 'VQrAx6wI4cv-J3BdqLRhIbN5gfUUCGf9sZnR_teei2U',
  'Accept': 'application/vnd.api+json'
});


@Injectable({
  providedIn: 'root'
})

export class UploadService {
  favorites: string[] = [] = JSON.parse(localStorage.getItem("favorites") || "[]");

  constructor(public http: HttpClient) {
  }

  //MULTILINGUAL
  callback_list: [Function?] = [];

  refreshComp(){
    this.callback_list.forEach((callback?: Function) => callback?.());
  }

  switchLanguage(idValue: string) {
    let currentLanguage = "";
    BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";
    currentLanguage = (idValue == 'portuguese') ? "/pt-pt" : "/en";
    BASE_URL += currentLanguage;
    this.callback_list.forEach((callback?: Function) => callback?.())
    // '?.' in JS means that nothing happens if there are no callback functions defined.
    //if there is one, it is executed
  };

  onChangeLanguage(callback: (lang: any) => void) {
    return this.callback_list.push(callback);
  }

  // the purpose of onChangeLanguage: populate callback_list array with callbacks. It will be called in every page of the app.
  // to do so, it receives a callback function as parameter.
  // (for instance it receives a callback to refresh a component)
  // user clicks on PT or EN on interface, it calls switchLanguage(). the callback_list is looped through and all necessary callbacks executed
  //e.g: we are in the channels page, we switched to PT, refresh() will load the page again with appropriate value of BASE_URL

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

  //POST COMMENTS
  postComment(entityType: string, contentID: number, username: string, email: string, comment: string){
    let commentBody;
    if (entityType == "node") {
      commentBody = {
        "entity_id": [{"target_id": contentID}],
        "entity_type": [{"value": "node"}],
        "comment_type": [{"target_id": "channel_comments"}],
        "field_name": [{"value": "field_comment"}],
        "field_comment_name": [{"value": username}],
        "field_email": [{"value": email}],
        "comment_body": [
          {"value": comment, "format": "plain_text"}
        ]
      }
    } else {
      commentBody = {
        "entity_id": [{"target_id": contentID}],
        "entity_type": [{"value": "media"}],
        "comment_type": [{"target_id": "media_comments"}],
        "field_name": [{"value": "field_comments"}],
        "field_comment_name_media": [{"value": username}],
        "field_media_email": [{"value": email}],
        "comment_body": [
          {"value": comment, "format": "plain_text"}
        ]
      }
    }
    return this.http.post(BASE_URL + '/comment', commentBody, {headers: HEADERS,} )
  };


  //REPORT COMMENTS
  postReport(comment_id: string, reason: string) {
    return this.http.post(LIKE_URL, {
      "entity_id": [comment_id],
      "entity_type": ["comment"],
      "field_reason": [reason],
      "flag_id": [{"target_id": "report_comments", "target_type": "flag"}],
      "uid": ["0"]
    }, {headers: HEADERS,})
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
    //using categories txid as contextual filter
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

  getContentBySlug(content_type: string, slug: string) {
    return this.http.get(BASE_URL + "/" + content_type + "/" + slug + "?_format=json");
  }

  getCount(content_type: string) {
    return this.http.get<PagesCount[]>(BASE_URL + "/api/" + content_type +"-count")
  }
}
