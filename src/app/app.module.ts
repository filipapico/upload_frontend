import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CardComponent } from './content-card/card.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AppRoutingModule } from './app-routing.module';
import {MenuComponent} from "./menu/menu.component";
import { PlaylistsComponent } from './playlists/playlists.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagsComponent } from './tags/tags.component';
import { ThematicComponent } from './thematic/thematic.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { ThematicsComponent } from './thematics/thematics.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelsComponent } from './channels/channels.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CardComponent,
    PlaylistComponent,
    MenuComponent,
    PlaylistsComponent,
    SidebarComponent,
    TagsComponent,
    ThematicComponent,
    VideoDetailComponent,
    ThematicsComponent,
    ChannelComponent,
    ChannelsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
