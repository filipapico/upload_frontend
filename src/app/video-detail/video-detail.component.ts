import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../upload.service";
import {Video} from "../interfaces";
import {DomSanitizer} from "@angular/platform-browser";
import {faBookmark} from '@fortawesome/free-regular-svg-icons';
import {faBookmark as faBookmarkFull} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnChanges {
  faBookmark = faBookmark;
  faBookmarkFull = faBookmarkFull;
  id!: number;
  video?: Video;
  video_url?: any;
  mediaEntityType = "media";
  channelVideos!: Video[]; //array containing the channel's videos
  nid?: number;
  message = false;
  tags?: string[];

  @Input() id_video?: string
  @Input() type?: string;


  constructor(private route: ActivatedRoute, public uploadService: UploadService, private sanitizer: DomSanitizer) {
  }

  // Detetar mudanca nos inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id_video && changes['id_video']) {
      this.id = parseInt(this.id_video);
      this.refresh();
    }
  }
  /*ngOnChanges is a lifecycle hook in Angular that is called when an input property of a component changes.
  The hook receives an object changes of type SimpleChanges,
  which holds the current and previous values of the changed properties.*/
  //the hook checks if the id_video property has changed (using changes['id_video'])
  //if so, it parses the value of id_video to an integer and assigns it to the id property.
  //Then, it calls the refresh() method. This is a common pattern for updating a component when an input value changes.


  ngOnInit(): void {
    this.uploadService.onChangeLanguage(() => {
      this.refresh();
    });
    if (!this.id_video) {
      // Subscribe changes in URL parameters
      this.route.params.subscribe(params => {
        // Detect changes in slug and save them in variable
        let slug = params['name'];
        // Get the media contents using the media slug. 1. API request field "link to media" in all-videos view
        // (used as input each time the app-contentcard is used)
        // 2. Get the media ID using the media json file "SITE/video/slug?_format=json"
        // 3. Make new API request to the all-video view and get all the remaining data (e.g. tags, duration, ...)
        this.uploadService.getContentBySlug("video", slug).subscribe((data: any) => {
          if (!data.mid) {
            return;
          }
          this.id = data.mid[0].value;
          this.refresh();
        })
      });
    }
    this.refresh();
    // third call necessary to initialize the component correctly if the 2 previous conditions are not filled
  }

  refresh() {
    if(this.id){
      this.uploadService.getVideo(this.id).subscribe((video) => {
        this.video = video[0];
        this.tags = video[0].field_media_tags.split(', ');
        this.uploadService.getChannelVideos(parseInt(this.video.nid)).subscribe((videos) => {
          this.channelVideos = videos;
        });

        this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.video.field_media_oembed_video.split("?v=")[1]);
        return this.video_url;
      })
    }
  }
}
