import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { SharedServiceService } from "src/app/services/shared-service.service";

import { GlobalConstants } from '../commons/global-constants';

@Injectable({providedIn: 'root'})

export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  USER_ROLE_SESSION_ATTRIBUTE_NAME = 'roleUser'

  public username: string;
  public password: string;
  public authLoginUrl: string;
  public roleUrl: string;
  public role: string;
  public forgetpassword: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private data: SharedServiceService) {
    this.authLoginUrl = GlobalConstants.baseLogUrl + 'basicauth';
    this.roleUrl = GlobalConstants.baseLogUrl + 'role';
    this.forgetpassword = GlobalConstants.baseLogUrl + 'forgetpassword';
  }

  authenticationService(username: string, password: string) {
    return this.http.get(this.authLoginUrl,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)

        this.getAuthorities().subscribe(data => {
          sessionStorage.setItem(this.USER_ROLE_SESSION_ATTRIBUTE_NAME, data.message);
          if (this.getRole() === 'TECH') {
            this.router.navigate(['/technician']);
            this.data.changeMessage("tech");
          }
          if (this.getRole() === 'ADMIN') {
            this.router.navigate(['/administrator']);
            this.data.changeMessage("admin");
          }else{
            this.router.navigate(['technician']);
          }
        });
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }



  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    return (user === null) ? false : true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    return (user === null) ? '' : user;
  }

  getRole(){
    let role = sessionStorage.getItem(this.USER_ROLE_SESSION_ATTRIBUTE_NAME)
    return (role === null) ? '' : role
  }

  public getAuthorities(): Observable<any> {
    return this.http.get(`${this.roleUrl}`);
  }

  
  forgetPassword(email: string) : Observable<any>{
    return this.http.get(`${this.forgetpassword}/${email}`);
  }

}
