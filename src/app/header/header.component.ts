import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public userservice:UserService,public router:Router) { }
  user:any;
  ngOnInit(): void {
      $('#homeNavigator').addClass('active');
      var links = document.querySelectorAll('.headerlink');
      links.forEach(function (element) {
        element.addEventListener('click', function (e) {
        // PreventDefault to prevent redirect
          e.preventDefault();
          links.forEach(function (element) {
          element.classList.remove('active');
        });
       this.classList.add('active');
      });
    });
  }
  LoggedIn():Boolean{
    if(this.userservice.LoggedIn()){
      this.user=JSON.parse(localStorage.getItem("Username")).username;
      return true;
    }
    else{
      return false;
    }
  }
  LoggedOut(){
    this.userservice.LoggedOut();
    this.router.navigate(['login']);
  }
}
