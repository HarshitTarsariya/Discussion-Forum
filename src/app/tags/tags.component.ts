import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  skipper=0;
  allPost=[];
  notEmptyPost=true;
  notScroll=true;
  admin:Boolean=false;
  tag="";
  constructor(private qaservice:QuestionanswerService,private spinner:NgxSpinnerService,private userservice:UserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')=='true'){
      this.admin=true;
    }
    else{
      this.admin=false;
    }
    this.route.paramMap.subscribe(
      (params:ParamMap)=>{
        this.allPost=[];
        this.skipper=0;
        this.notEmptyPost=true;
        this.notScroll=true;
        this.tag=params.get('id').toString();
        console.log(this.tag);
        this.onScroll();
        this.scrollToTop();
      });
  }
  scrollToTop(){
    $('html,body').animate({scrollTop: 0},"slow");
  }
  onScroll(){
    if(this.notScroll && this.notEmptyPost){
      this.spinner.show();
      this.notScroll=false;
      this.loadPost();
    }    
  }
  loadPost(){
    this.qaservice.GetQuestionsByTags({skipper:this.skipper,tag:this.tag}).subscribe(
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

