import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  questionid:String;
  questionwithanswer;
  constructor(private qaservice:QuestionanswerService,private route:ActivatedRoute,private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params:ParamMap)=>{
        this.questionid=params.get('id').toString();
        this.qaservice.QuestionWithAnswer({questionid:this.questionid}).subscribe(
          (data)=>{
            this.questionwithanswer=data[0];
            this.scrollToTop();
          }
        );
      }
    );
  }
  scrollToTop(){
    $('html,body').animate({scrollTop: 0},"slow");
  }
  scrollToBottom() {
    $('html,body').animate({scrollTop: document.body.scrollHeight},"slow");
    $('#edit').css("display","block");
  }
  PublishAnswer(answer){
    if(!this.userservice.LoggedIn()){
      this.router.navigate(['/login']);
    }
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date=new Date();
    var dd=date.getDate().toString()+' '+months[date.getMonth()]+' '+date.getFullYear().toString();
    var username=JSON.parse(localStorage.getItem('Username')).username;
    
    this.qaservice.UploadAnswer({id:this.questionid,answer:answer.value,answerer:username,time:dd}).subscribe(
      (data)=>{
        console.log(data[0]);
        this.questionwithanswer=data[0];
        $('#edit').css("display","none");
      }
    );
  }
}
