import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-followingpost',
  templateUrl: './followingpost.component.html',
  styleUrls: ['./followingpost.component.css']
})
export class FollowingpostComponent implements OnInit {
  skipper=0;
  allPost=[];
  notEmptyPost=true;
  notScroll=true;
  username;
  admin:Boolean=false;
  constructor(private router:Router,private qaservice:QuestionanswerService,private spinner:NgxSpinnerService,private userservice:UserService) { }

  ngOnInit(): void {
    if(!this.userservice.LoggedIn()){
      this.router.navigate(['/login']);
    }
    if(localStorage.getItem('admin')=='true'){
      this.admin=true;
    }
    else{
      this.admin=false;
    }
    this.username=JSON.parse(localStorage.getItem("Username")).username;
    this.onScroll();
  }
  onScroll(){
    if(this.notScroll && this.notEmptyPost){
      this.spinner.show();
      this.notScroll=false;
      this.loadPost();
    }    
  }
  loadPost(){

    this.qaservice.GetQuestionsByFollowing({username:this.username,skipper:this.skipper}).subscribe(
      (data)=>{
        if(data.length==0){
          this.notEmptyPost=false;
          this.skipper=-1;
          this.spinner.hide();
        }
        this.allPost=this.allPost.concat(data);
        this.notScroll=true;
        this.skipper+=1;
      }
    );
  }
  DeletePost(id){
    this.qaservice.RemovePost({id:id}).subscribe(
      (data)=>{
        this.allPost=this.allPost.filter((ele)=>{
          if(ele['_id']!=id)
            return ele;
        })
      }
    );
  }
}
