import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnswerComponent } from './answer/answer.component';
import { EnterotpComponent } from './enterotp/enterotp.component';
import { ErrorComponent } from './error/error.component';
import { FeedComponent } from './feed/feed.component';
import { FollowingpostComponent } from './followingpost/followingpost.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'enterotp',component:EnterotpComponent},
  {path:'newpassword',component:NewpasswordComponent},
  {
    path:'home',
    component:HomeComponent,
    children:[
      {path:'',component:FeedComponent,pathMatch:"full"},
      {path:'profile/:id',component:ProfileComponent},
      {path:'answer/:id',component:AnswerComponent},
      {path:'followingpost',component:FollowingpostComponent},
      {path:'tags/:id',component:TagsComponent}
    ]
  },
  {path:'admin',component:AdminComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
