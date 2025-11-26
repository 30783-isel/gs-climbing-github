import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  errorMessage = 'Invalid Credentials';
  allfieldsmessage: string;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  fillallfields = false;

  invalidEmail = false;
  invalidEmailMessage = 'Invalid email';
  emailSend = false;
  emailSendMessage  = 'Check your email';
  emptyEmail = false;
  emptyEmailMessage  = 'Empty email';

  constructor(private authenticationService: AuthenticationService, private commonsService: CommonsService) { }

  ngOnInit() {
  }

  handleLogin() {
    if (this.commonsService.isEmpty(this.username) || this.commonsService.isEmpty(this.password)) {
      this.allfieldsmessage = 'Login please';
      this.fillallfields = true;
      this.invalidLogin = false;
      this.loginSuccess = false;
    } else {
      this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
        this.fillallfields = false;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
      }, () => {
        this.fillallfields = false;
        this.invalidLogin = true;
        this.loginSuccess = false;
      });
    }
  }

  forgetPassword(){
    if (this.commonsService.isEmpty(this.email)) {
      this.invalidEmail = false;
      this.emailSend = false;
      this.emptyEmail = true;
    }else{
      this.authenticationService.forgetPassword(this.email).subscribe((result) => {
        this.invalidEmail = false;
        this.emailSend = true;
        this.emptyEmail = false;
      },error => {
        this.invalidEmail = true;
        this.emailSend = false;
        this.emptyEmail = false;
      });


    }
  }

}
