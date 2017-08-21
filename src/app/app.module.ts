import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ReviewComponent } from './review/review.component';

import { Routing, AppRoutingProviders } from './app.routes';
import { PosComponent } from './pos/pos.component';
import { PosVideoComponent } from './pos-video/pos-video.component';
import { LoadingComponent } from './shared/loading.component';
import { NavbarComponent } from './navbar/navbar.component';

import { Http, RequestOptions } from '@angular/http';
import { AuthService } from 'app/auth/auth.service';
import { CallbackComponent } from './auth/callback.component';
import { CommentComponent } from './comment/comment.component';
import { ShareComponent } from './shared/share.component';
import { UserAvatarComponent } from './user/user-avatar.component';
import { HomeComponent } from './home/home.component';
import { OtherReviewComponent } from './review/other-review.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    PosComponent,
    PosVideoComponent,
    LoadingComponent,
    NavbarComponent,
    CallbackComponent,
    CommentComponent,
    ShareComponent,
    UserAvatarComponent,
    HomeComponent,
    OtherReviewComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    AppRoutingProviders,
    Title,
    AuthService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
