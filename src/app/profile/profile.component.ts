import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userservice:UserService,private route:ActivatedRoute,private router:Router,private qaservice:QuestionanswerService,private spinner:NgxSpinnerService) { }
  skipper=0;
  allPost=[];
  notEmptyPost=true;
  notScroll=true;
  username:String;
  user;
  editflag:Boolean=true; alreadyfollowing:Boolean=true;
  userloggedin;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params:ParamMap)=>{
        this.allPost=[];
        this.skipper=0;
        this.notEmptyPost=true;
        this.notScroll=true;
        this.editflag=true;
        this.alreadyfollowing=true;

        this.username=params.get('id').toString();
        if(localStorage.getItem('Username')!=null)
        {
          this.userloggedin=JSON.parse(localStorage.getItem('Username')).username;
          this.editflag=(this.userloggedin!=this.username);
        }
        else{
          this.editflag=true;
          this.alreadyfollowing=false;
        }
        this.onScroll();
        this.scrollToTop();
        this.userservice.getUserDetails({username:this.username}).subscribe(
          (data)=>{
            this.user=data[0];
            if(this.alreadyfollowing!=false){
              this.alreadyfollowing=this.user['follower'].includes(this.userloggedin);
            }
          }
        );
      }
    );
  }
  scrollToTop(){
    $('html,body').animate({scrollTop: 0},"slow");
  }
  OnSubmit(){
    this.userservice.UpdateUser(this.user).subscribe(
      (data)=>{
        this.user=data[0];
        $('#savebutton').fadeOut(1000).fadeIn(1000);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  Follow(){
    if(this.userservice.LoggedIn()==false){
      this.router.navigate(["/login"]);
    }
    this.userservice.Follow({clicker:JSON.parse(localStorage.getItem('Username')).username,user:this.username}).subscribe(
      (data)=>{
        this.user=data[0];
      }
    );
    this.alreadyfollowing=true;
  }
  UnFollow(){
    this.userservice.UnFollow({clicker:JSON.parse(localStorage.getItem('Username')).username,user:this.username}).subscribe(
      (data)=>{
        this.user=data[0];
      }
    );
    this.alreadyfollowing=false;
  }

  onScroll(){
    if(this.notScroll && this.notEmptyPost){
      this.spinner.show();
      this.notScroll=false;
      this.loadPost();
    }    
  }
  loadPost(){
    this.qaservice.GetQuestionsBasedonUser({skipper:this.skipper,username:this.username}).subscribe(
      (data)=>{
        if(data.length==0){
          this.notEmptyPost=false;
          this.skipper=-1;
          this.spinner.hide();
        }
        this.allPost=this.allPost.concat(data);
        this.notScroll=true;

        // console.log(this.allPost);
        this.skipper+=1;
      }
    );
  }
}
