import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import {ConfirmEqualValidatorDirective} from '../shared/confirm-equal-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerComponent } from './answer/answer.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { EnterotpComponent } from './enterotp/enterotp.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { FollowingpostComponent } from './followingpost/followingpost.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent,
    FeedComponent,
    ProfileComponent,
    AnswerComponent,
    ForgetpasswordComponent,
    EnterotpComponent,
    NewpasswordComponent,
    FollowingpostComponent,
    AdminComponent,
    ErrorComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
