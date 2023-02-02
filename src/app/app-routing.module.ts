import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {ThematicComponent} from "./thematic/thematic.component";
import {ThematicsComponent} from "./thematics/thematics.component";
import {ChannelsComponent} from "./channels/channels.component";
import {ChannelComponent} from "./channel/channel.component";
import {ContentcardComponent} from "./contentcard/contentcard.component";
import {MyfavoritesComponent} from "./myfavorites/myfavorites.component";
import {ChannelplayerComponent} from "./channelplayer/channelplayer.component";
import {VideotagComponent} from "./videotag/videotag.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'channel/:name', component: ChannelComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'channelplayer/:nid', component: ChannelplayerComponent},
  {path: 'contentcard', component: ContentcardComponent},
  {path: 'video-detail/:name', component: VideoDetailComponent},
  {path: 'thematic/:name', component:ThematicComponent},
  {path: 'thematics', component: ThematicsComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'playlist/:name', component: PlaylistComponent},
  {path: 'favorites', component: MyfavoritesComponent},
  {path: 'videotag/:name', component: VideotagComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
