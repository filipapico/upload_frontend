import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {VideoComponent} from "./video/video.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {ThematicComponent} from "./thematic/thematic.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'video', component: VideoComponent},
  {path: 'video-detail/:mid', component: VideoDetailComponent},
  {path: 'thematic', component: ThematicComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'playlist/:id', component: PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
