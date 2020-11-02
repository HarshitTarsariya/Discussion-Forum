import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  Credentials:boolean=false;
  Usernamesuggest:string="";
  Username:string="";
  Usernameflag:Boolean=false;
  selectedFile: ImageSnippet;

  login ={
    username : "",
    password: ""
  }
  register={
    firstname:"",
    lastname:"",
    username:"",
    password:"",
    confirmpassword:"",
    email:"",
    mobile:"",
    profile:""
  }
  checker:Object;
  errormsg:string;
  constructor(private userservice:UserService,private router:Router,private imageservice:ImageService) {
  }

  ngOnInit(): void {
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
    this.DisplayingOrNot();
  }
  ngOnDestroy(){
    this.bodyTag.classList.remove('login-page');
    this.htmlTag.classList.remove('login-page');
  }

  async Loginvalidationforuser(data){
    
    //validate user in table
    this.checker=await this.userservice.Loginuser(this.login).toPromise();
    if(this.checker['status']==1){
      var obj={
        username:this.login.username,
        timestamp:new Date().getTime()
      };
      localStorage.setItem("Username",JSON.stringify(obj));
      this.router.navigate(["home"]);
    }
    else{
      this.Credentials=true;
    }
  }
  async Loginvalidationforadmin(data){
    this.checker=await this.userservice.LoginAdminuser(this.login).toPromise();
    if(this.checker['status']==1){
      var obj={
        username:this.login.username,
        timestamp:new Date().getTime()
      };
      localStorage.setItem("Username",JSON.stringify(obj));
      localStorage.setItem('admin','true');
      this.router.navigate(["home"]);
    }
    else{
      this.Credentials=true;
    }
  }
  async Registernewuser(data){
    console.log(this.register.username+'---');
    this.checker=await this.userservice.Registeruser(this.register).toPromise();
    this.setProfile(data);
    $('#id03').css('display','none');
    $('#loading_register').css('display','none');
    if(this.checker['status']==1){
      alert("Registered Successfully");
      this.router.navigate(["login"]);
    }
    else{
      alert("Registration Error ! Please try again after some time");
    }
    
  }
  async Checkusername(username){
    this.Usernamesuggest="";
    this.Username=username;
    this.checker =await this.userservice.Checkusername({username: username}).toPromise();
    if(this.checker['status']==1){
      this.Usernameflag=false;
      this.Usernamesuggest="";
      this.register.username=username;
    }
    else{
      this.Usernameflag=true;
      this.Usernamesuggest=username+Math.floor(Math.random()*97).toString();
    }
  }
  
  Passwordvisibility(event){
    if(event.target.checked){
      $('input[placeholder="Enter Password"]').attr('type','text');
    }
    else{
      $('input[placeholder="Enter Password"]').attr('type','password');
    }
  }
  Usernamesuggestion(){
    let text=$('#Suggestion').text();
    $('#Registername').val(text);
    this.Checkusername(text);
  }
    
  DisplayingOrNot(){
    var block1 = document.getElementById('id01');
    var block2 = document.getElementById('id02');
    var block3 = document.getElementById('id03');
    window.onclick = function(event) {
        if (event.target == block1) {
            block1.style.display = "none";
            document.getElementById("loading_login").style.display = "none";
        } else if (event.target == block2) {
            block2.style.display = "none";
            document.getElementById("loading_admin_login").style.display = "none";
        } else if (event.target == block3) {
            block3.style.display = "none";
            document.getElementById("loading_register").style.display = "none";
        }
      }
  }
  setProfile(imageInput:any){
    if(imageInput==null){
      return;
    }
    const oldfile: File = imageInput.files[0];
    var blob = oldfile.slice(0, oldfile.size, 'image/jpg');   
    const file:File = new File([blob], this.register.username+'.jpg', {type: 'image/jpg'});
    const reader = new FileReader();
   
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageservice.uploadImage(this.selectedFile.file).subscribe();
    });
    reader.readAsDataURL(file);
  }
}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}