import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  usernameClass:String;
  passwordClass:String;
  constructor(
    private authService: AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  changedUsername(n){
    if(n.length){
      this.usernameClass = 'up';
    }
    else {
      this.usernameClass = '';
    }
  }

  changedPassword(n){
    if(n.length){
      this.passwordClass = 'up';
    }
    else {
      this.passwordClass = '';
    }
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    // authenticate user
    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        // this.flashMessagesService.show("You are now logged in!", { cssClass: 'alert-success', timeout: 5000 });
        // document.getElementById('app-home').style.display = 'none';
        this.router.navigate(['/feed']);        
      }
      else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });
  }
}
