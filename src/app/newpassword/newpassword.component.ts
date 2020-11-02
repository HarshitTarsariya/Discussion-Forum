import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  notequal:Boolean=false;
  constructor(private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  OnSubmit(password,confirmpassword){
    if(password==confirmpassword){
      this.userservice.ChangePassword({username:localStorage.getItem('username'),password:password,confirmpassword:confirmpassword}).subscribe();
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    else{
      this.notequal=true;
    }
  }
}
