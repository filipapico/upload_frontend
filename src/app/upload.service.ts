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
import localePT from "../locale/pt";
import localeEN from "../locale/en";
import {map} from "rxjs";


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
  currentLanguage: string = '/en';
  translations = localeEN;

  constructor(public http: HttpClient) {
  }

  //MULTILINGUAL
  callback_list: [Function?] = [];

  refreshComp() {
    this.callback_list.forEach((callback?: Function) => callback?.());
  }

  switchLanguage(idValue: string) {
    BASE_URL = "https://dev-project-upskill2-grupo4v2.pantheonsite.io";
    this.currentLanguage = (idValue == 'portuguese') ? "/pt-pt" : "/en";
    BASE_URL += this.currentLanguage;
    this.callback_list.forEach((callback?: Function) => callback?.())
    // '?.' in JS means that nothing happens if there are no callback functions defined.
    //if there is one, it is executed

    let traducoes: any = {
      "/pt-pt": localePT, "/en": localeEN
    };

    this.translations = traducoes[this.currentLanguage];
  }

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
    return this.http.get(BASE_URL + "/session/token");
  }

  //POST COMMENTS
  postComment(entityType: string, contentID: number, username: string, email: string, comment: string) {
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
    return this.http.post(BASE_URL + '/comment', commentBody, {headers: HEADERS,})
  };

  getComments(type: string, id: number) {
    return this.http.get<Comment[]>(BASE_URL + "/api/comments/" + type + "/" + id);
  }


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
  postFlag(flagType: string, idVideo: string) {
    let flagBody: {}
    if (flagType == 'like') {
      flagBody = {
        "entity_id": [idVideo],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "like_videos", "target_type": "flag"}],
        "uid": ["0"]
      }
    } else {
      flagBody = {
        "entity_id": [idVideo],
        "entity_type": ["media"],
        "flag_id": [{"target_id": "dislike_videos", "target_type": "flag"}],
        "uid": ["0"]
      }
    }
    return this.http.post(BASE_URL + '/entity/flagging', flagBody, {headers: HEADERS,})
  }

  getLikes(id_video: string) {
    return this.http.get<Likes[]>(BASE_URL + "/api/like/videos/" + id_video)
  }

  getDislikes(id_video: string) {
    return this.http.get<Likes[]>(BASE_URL + "/api/dislike/videos/" + id_video)
  }

//PLACE HERE LIKES LOCAL STORAGE


  //CATEGORIES
  /* getAllCategories() {
     return this.http.get<Categories[]>(BASE_URL + "/api/categories");
   }*/

  getCategoriesinChannels(pNum: number) {
    return this.http.get<Categories[]>(BASE_URL + "/api/categories-channels?page=" + pNum);
  }

  //CHANNELS
  getChannels(id: string) {
    return this.http.get<Channels[]>(BASE_URL + "/api/channels/" + id);
  }

  getChannelsFromCategory(id: string) {
    //using categories tid as contextual filter
    return this.http.get<Channels[]>(BASE_URL + "/api/categories/channels/" + id);
  }

  // QUESTION Maybe update all ids to type string? Since our APIs always return strings...
  getChannelVideos(id: any) {
    return this.http.get<Video[]>(BASE_URL + "/api/channel/" + id);
  }

  //THEMATICS

  getTagsInThematics(pNum: number) {
    return this.http.get<Tags[]>(BASE_URL + "/api/tags-thematics?page=" + pNum)
  }

  getThematicsByTag(id: string, pNum: number) {
    return this.http.get<Thematics[]>(BASE_URL + "/api/thematics-tag/" + id + '?page=' + pNum)
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
  getCategoriesinPlaylists() {
    return this.http.get<Categories[]>(BASE_URL + "/api/categories-playlists");
  }

  getPlaylists(id: string, pNum: any) {
    return this.http.get<Playlists[]>(BASE_URL + "/api/playlists/" + id + "?page=" + pNum);
  }

  getPlaylist(id: string) {
    return this.http.get<Video[]>(BASE_URL + "/api/playlist/" + id);
  }

  //FAVORITES

  favorites: string[] = [] = JSON.parse(localStorage.getItem("favorites") || "[]");

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

  flaggedVideos: string[] = [] = JSON.parse(localStorage.getItem("flagged") || "[]")

  isFlagged(id: string) {
    console.log(this.flaggedVideos)
    return this.flaggedVideos.includes(id)
  }

  flagVideo(id: string) {
    console.log("video is flagged")
    if (this.isFlagged(id)) {
      this.flaggedVideos.splice(this.flaggedVideos.indexOf(id), 1)
    } else {
      this.flaggedVideos.push(id)
    }
    localStorage.setItem("flagged", JSON.stringify(this.flaggedVideos))
  }

  //URL FRIENDLY
  getContentBySlug(content_type: string, slug: string) {
    return this.http.get(BASE_URL + "/" + content_type + "/" + slug + "?_format=json");
  }

  //PAGINATION
  getPagination(content_type: string, id: string, itemsPerPage: number) {
    return this.http.get<PagesCount[]>(BASE_URL + "/api/" + content_type + "-count/" + id).pipe(map((pagesCount) => {
      let numberOfItems = 0
      if (!pagesCount[0].nid) {
        numberOfItems = parseInt(pagesCount[0].mid)
      } else {
        numberOfItems = parseInt(pagesCount[0].nid)
      }
      //const itemsPerPage = 6
      let numberOfPages = Math.ceil(numberOfItems / itemsPerPage)
      let pageNumbers = new Array(numberOfPages)
      for (let i = 0; i < numberOfPages; i++) {
        pageNumbers[i] = i
      }
      return {
        pageNumbers
      }
    }))
  }
}
