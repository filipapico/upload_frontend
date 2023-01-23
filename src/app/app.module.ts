import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {PaginationModule} from "@coreui/angular";

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
import {ContentcardComponent} from './contentcard/contentcard.component';
import {ThematicComponent} from "./thematic/thematic.component";
import {CommentsComponent} from './comments/comments.component';
import {SuggestioncardComponent} from './suggestioncard/suggestioncard.component';
import {SuggestionlistComponent} from './suggestionlist/suggestionlist.component';
import {UsersloginComponent} from './userslogin/userslogin.component';
import {SidecardComponent} from './sidecard/sidecard.component';
import {CommentformComponent} from './commentform/commentform.component';
import {FlagComponent} from './flag/flag.component';
import {AvatarModule} from 'ngx-avatar';
import {MyfavoritesComponent} from './myfavorites/myfavorites.component';
import {FooterComponent} from './footer/footer.component';
import {CollapseComponent} from './collapse/collapse.component';
import {CardModule, CollapseModule} from "@coreui/angular";
import {PaginationComponent} from './pagination/pagination.component';

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
    SuggestioncardComponent,
    SuggestionlistComponent,
    UsersloginComponent,
    SidecardComponent,
    CommentformComponent,
    FlagComponent,
    MyfavoritesComponent,
    FooterComponent,
    CollapseComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    AvatarModule,
    CardModule,
    CollapseModule,
    BrowserAnimationsModule,
    PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule {
}
