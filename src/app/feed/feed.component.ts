import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  skipper=0;
  allPost=[];
  notEmptyPost=true;
  notScroll=true;
  admin:Boolean=false;
  constructor(private qaservice:QuestionanswerService,private spinner:NgxSpinnerService,private userservice:UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=='true'){
      this.admin=true;
    }
    else{
      this.admin=false;
    }
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
    this.qaservice.GetQuestions({skipper:this.skipper}).subscribe(
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
  LoggedIn():Boolean{
    if(this.userservice.LoggedIn()){
      return true;
    }
    else{
      return false;
    }
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
