import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/';

import { User } from 'src/app/models/user.model';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private allUsersUrl: string;
  private userUrl: string;
  private userIdUrl: string;
  private createUserUrl: string;
  private updateUrl: string;
  private updateUserUrl: string;
  private deleteUserUrl: string;
  private userProjectUrl: string;
  private filterUserUrl: string;
  private updateUserDataUrl: string;

  constructor(private http: HttpClient) {
    this.allUsersUrl = GlobalConstants.baseUsersUrl + 'users';
    this.userUrl = GlobalConstants.baseUsersUrl + 'user';
    this.userIdUrl = GlobalConstants.baseUsersUrl + 'userId';
    this.createUserUrl = GlobalConstants.baseUsersUrl + 'create';
    this.updateUrl = GlobalConstants.baseUsersUrl + 'update';
    this.updateUserUrl = GlobalConstants.baseUsersUrl + 'update-user-projects';
    this.deleteUserUrl = GlobalConstants.baseUsersUrl + 'delete';
    this.userProjectUrl = GlobalConstants.baseUsersUrl + 'user-projects';
    this.filterUserUrl = GlobalConstants.baseUsersUrl + 'search';
    this.updateUserDataUrl = GlobalConstants.baseUsersUrl + 'update-user-data';
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.allUsersUrl);
  }

  public getUser(username: string): Observable<any> {
    return this.http.get<User>(`${this.userUrl}/${username}`);
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get<User>(`${this.userIdUrl}/${id}`);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post<any>(this.createUserUrl, user);
  }

  public update(user: User): Observable<any> {
    return this.http.post<any>(this.updateUrl, user);
  }
  
  public updateUserData( formData: FormData ): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${this.updateUserDataUrl}`, formData);
  }

  public updateUser(username: string, projects: string): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${this.updateUserUrl}/${username}/${(!projects || projects.length === 0) ? '000' : projects}`);
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.deleteUserUrl}/${username}`, { responseType: 'text' });
  }

  public getUserProject(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.userProjectUrl}/${userId}`);
  }

  public filterUsers( user: User ): Observable<User[]> {
    return this.http.post<any>(this.filterUserUrl, user);
  }

}
