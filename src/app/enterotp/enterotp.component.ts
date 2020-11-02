import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.component.html',
  styleUrls: ['./enterotp.component.css']
})
export class EnterotpComponent implements OnInit {
  otperror:Boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  OnSubmit(enteredvalue){
    if(enteredvalue.toString()==localStorage.getItem('otp')){
      this.router.navigate(['/newpassword']);
    }else{
      this.otperror=true;
    }
  }
}
