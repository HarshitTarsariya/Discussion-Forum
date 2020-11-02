import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { QuestionanswerService } from '../questionanswer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userservice:UserService,private router:Router,private qaservice:QuestionanswerService) { }
  topcontributors=[];
  trendingtags=[];
  suggestions=[];
  tagsuggestions=[];
  showsuggestion:Boolean=false;
  allusers=[];
  admin:Boolean=false;

  ngOnInit(): void {
    if(localStorage.getItem('admin')=='true'){
      this.admin=true;
    }
    else{
      this.admin=false;
    }
    this.setcontributors();
    this.settrendingtags();
  }
  setcontributors(){
    this.userservice.GetBestContributors().subscribe(
      (data)=>{
        this.topcontributors=data;
      }
    );
  }
  settrendingtags(){
    this.qaservice.GetTrendingtags().subscribe(
      (data)=>{
        this.trendingtags=data;
      }
    );
  }
  OnSubmit(title,tag,text){
    if(!this.userservice.LoggedIn()){
      $('#questionmodalclose').click();
      this.router.navigate(['login']);
    }
    var obj=JSON.parse(localStorage.getItem("Username"));
    var tags=tag.value.split(",");
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date=new Date();
    var dd=date.getDate().toString()+' '+months[date.getMonth()]+' '+date.getFullYear().toString();

    var question={
      asker:obj.username,
      time:dd,
      title:title.value,
      question:text.value,
      tags:[]
    }
    tags.forEach(element => {
      question.tags.push(element);
    });
    console.log(JSON.stringify(question));
    this.qaservice.UploadQuestion(question).subscribe(
      (data)=>{
        console.log(data);
      },
      (err)=>{
        console.log("Error in Uploading Question");
      });
      $('#questionmodalclose').click();
  }

  loadSuggestion(prefix){
    if(prefix){
      this.showsuggestion=true;
      this.userservice.GetSuggestions({prefix:prefix}).subscribe(
        (data)=>{
          this.suggestions=data;
        }
      );
      this.qaservice.GetSuggestionsByTags({prefix:prefix}).subscribe(
        (data)=>{
          console.log("Tags");
          this.tagsuggestions=data;
        }
      );
    }
    else{
      this.showsuggestion=false;
    }
  }
}
