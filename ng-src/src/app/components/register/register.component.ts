import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // checking required fields
    if(!this.validateService.validateRegister(user)){
      console.log('fill all fields!');
      this.flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // validating email
    if(!this.validateService.validateEmail(user.email)){
      console.log('email invalid!');
      this.flashMessagesService.show('Please use a valid email!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // register user code
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessagesService.show('Registered Successfully, Continue to Login!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);  
      }
      else{
        this.flashMessagesService.show('Cannot Register At this moment', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
