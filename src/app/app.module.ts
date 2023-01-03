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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    VideoComponent,
    PlaylistComponent,
    MenuComponent,
    PlaylistsComponent
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
