import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuComponent} from "./menu/menu.component";
import {PlaylistsComponent} from './playlists/playlists.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TagsComponent} from './tags/tags.component';
import {VideoDetailComponent} from './video-detail/video-detail.component';
import {ThematicsComponent} from './thematics/thematics.component';
import {ChannelComponent} from './channel/channel.component';
import {ChannelsComponent} from './channels/channels.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContentcardComponent } from './contentcard/contentcard.component';
import {ThematicComponent} from "./thematic/thematic.component";
import { CommentsComponent } from './comments/comments.component';
import { SuggestioncardComponent } from './suggestioncard/suggestioncard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PlaylistComponent,
    MenuComponent,
    PlaylistsComponent,
    SidebarComponent,
    TagsComponent,
    VideoDetailComponent,
    ThematicsComponent,
    ThematicComponent,
    ChannelComponent,
    ChannelsComponent,
    ContentcardComponent,
    CommentsComponent,
    SuggestioncardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {
}
