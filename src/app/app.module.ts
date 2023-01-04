import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VideoComponent } from './video/video.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AppRoutingModule } from './app-routing.module';
import {MenuComponent} from "./menu/menu.component";
import { PlaylistsComponent } from './playlists/playlists.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagsComponent } from './tags/tags.component';
import { ThematicComponent } from './thematic-detail/thematic.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { ThematicsComponent } from './thematics/thematics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    VideoComponent,
    PlaylistComponent,
    MenuComponent,
    PlaylistsComponent,
    SidebarComponent,
    TagsComponent,
    ThematicComponent,
    VideoDetailComponent,
    ThematicsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
