import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {CardComponent} from "./content-card/card.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {ThematicComponent} from "./thematic-detail/thematic.component";
import {ThematicsComponent} from "./thematics/thematics.component";
import {ChannelsComponent} from "./channels/channels.component";
import {ChannelComponent} from "./channel/channel.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'channel/:nid', component: ChannelComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'card', component: CardComponent},
  {path: 'video-detail/:mid', component: VideoDetailComponent},
  {path: 'thematics', component: ThematicsComponent},
  {path: 'thematic-detail', component: ThematicComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'playlist/:nid', component: PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
