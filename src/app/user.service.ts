import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url='http://localhost:3000';

  constructor(private http:HttpClient ) {}

  Registeruser(data){
    console.log("Registering User");
    return this.http.post( this._url+ '/users/register', data);
  }
  Checkusername(username){
    return this.http.post(this._url+'/user/checkusername',username);
  }
  Loginuser(data){
    return this.http.post(this._url+'/user/login',data);
  }
  LoggedIn():Boolean{
    return localStorage.getItem("Username")!=null && !this.Timecheckout();
  }
  LoggedOut(){
    localStorage.clear();
  }
  Timecheckout(){
    
    var obj=JSON.parse(localStorage.getItem("Username"));
    const dateString = obj.timestamp;
    const now = new Date().getTime().toString();
    if (( parseInt ( now )-parseInt ( dateString )) > 900000 ){
      localStorage.clear();
      return true;
    }
    else{
      return false;
    }
  }
  getUserDetails(data):Observable<Object>{
    return this.http.post<Object>(this._url+'/user/getdetails',data);
  }
  UpdateUser(data){
    return this.http.post(this._url+'/user/setdetails',data);
  }
  Follow(data):Observable<Object>{
    return this.http.post<Object>(this._url+'/user/follow',data);
  }
  UnFollow(data):Observable<Object>{
    return this.http.post<Object>(this._url+'/user/unfollow',data);
  }
  GetBestContributors():Observable<any[]>{
    return this.http.get<any[]>(this._url+'/user/contribution');
  }
  GetSuggestions(prefix):Observable<any[]>{
    return this.http.post<any[]>(this._url+'/user/suggestion',prefix);
  }
  MailForForgetPassword(username){
    var otp=Math.floor((Math.random() * 10000) + 1).toString();
    localStorage.setItem('otp',otp);
    return this.http.post( this._url+ '/user/forgetpassword', {username:username,otp:otp});
  }
  ChangePassword(data){
    return this.http.post(this._url+'/user/newpassword',data);
  }
  LoginAdminuser(data){
    return this.http.post(this._url+'/user/adminlogin',data);
  }
}
