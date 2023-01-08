import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {VideoComponent} from "./video/video.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {ThematicComponent} from "./thematic-detail/thematic.component";
import {ThematicsComponent} from "./thematics/thematics.component";
import {ChannelsComponent} from "./channels/channels.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'video', component: VideoComponent},
  {path: 'video-detail/:mid', component: VideoDetailComponent},
  // {path: 'channel', component: } ADD CHANNEL COMPONENT HERE
  {path: 'thematics', component: ThematicsComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'playlist/:nid', component: PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
