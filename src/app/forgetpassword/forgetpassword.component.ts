import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  mailerror:Boolean=false;
  checker:Object;
  constructor(private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  
  async OnSubmit(username){
    this.checker=await this.userservice.MailForForgetPassword(username).toPromise();
    this.mailerror=!this.checker['status'];
    if(this.mailerror==false){
      localStorage.setItem('username',username);
      this.router.navigate(['/enterotp']);
    }
  }
}
