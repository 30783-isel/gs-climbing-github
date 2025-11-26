import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Project } from 'src/app/models/project.model';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private createProjectUrl: string;
  private filterProjectUrl: string;
  private projectByIdUrl: string;
  private projectByUserUrl: string;
  private deleteProjectUrl: string;
  private allProjectsUrl: string;
  private addTurbineAddUrl: string;
  private getTurbineUrl: string;
  private getTurbineByIdUrl: string;
  private updateTurbineAddUrl: string;
  private updateTurbineNameAddUrl: string;
  private deleteTurbineAddUrl: string;
  private updateUsersProjectUrl: string;
  
  constructor(private http: HttpClient) {
    this.createProjectUrl = GlobalConstants.baseProjectsUrl + 'create';
    this.filterProjectUrl = GlobalConstants.baseProjectsUrl + 'search';
    this.projectByIdUrl = GlobalConstants.baseProjectsUrl + 'project-by-id';
    this.projectByUserUrl = GlobalConstants.baseProjectsUrl + 'projects-by-user';
    this.deleteProjectUrl = GlobalConstants.baseProjectsUrl + 'delete';
    this.allProjectsUrl = GlobalConstants.baseProjectsUrl + 'all';
    this.addTurbineAddUrl = GlobalConstants.baseProjectsUrl + 'add-turbine';
    this.getTurbineUrl = GlobalConstants.baseProjectsUrl + 'turbines';
    this.getTurbineByIdUrl = GlobalConstants.baseProjectsUrl + 'turbine-by-id';
    this.updateTurbineAddUrl = GlobalConstants.baseProjectsUrl + 'update-turbine';
    this.updateTurbineNameAddUrl = GlobalConstants.baseProjectsUrl + 'update-turbine-name';
    this.deleteTurbineAddUrl = GlobalConstants.baseProjectsUrl + 'delete-turbine';
    this.updateUsersProjectUrl = GlobalConstants.baseProjectsUrl + 'update-users-project';
   }

  public createProject(project: Project): Observable<any> {
    return this.http.post<any>(this.createProjectUrl, project);
  }

  public filterProject( project: Project ): Observable<Project[]> {
    return this.http.post<any>(this.filterProjectUrl, project);
  }

  public getAllProjectsByUserId( id : String ): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectByUserUrl}/${id}`);
  }

  public deleteProjects(name: string): Observable<any> {
    return this.http.delete(`${this.deleteProjectUrl}/${name}`, { responseType: 'text' });
  }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.allProjectsUrl);
  }

  public getProject( idProject : number ): Observable<any> {
    return this.http.get(`${this.projectByIdUrl}/${idProject}`);
  }

  public addTurbine( projectName : String ): Observable<any> {
    return this.http.get(`${this.addTurbineAddUrl}/${projectName}`);
  }

  public getTurbine( id : string ): Observable<any> {
    return this.http.get(`${this.getTurbineByIdUrl}/${id}`);
  }

  public getTurbines( idProject : String ): Observable<any> {
    return this.http.get(`${this.getTurbineUrl}/${idProject}`);
  }

  public updateTurbine( formData: FormData ): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${this.updateTurbineAddUrl}`, formData);
    
  }

  public updateTurbineName( formData: FormData ): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${this.updateTurbineNameAddUrl}`, formData);
  }

  public deleteTurbine( id : String ): Observable<any> {
    return this.http.delete(`${this.deleteTurbineAddUrl}/${id}`);
  }

  public updateUsersProject( idProject : String, users : String  ): Observable<any> {
    return this.http.get<any>(`${this.updateUsersProjectUrl}/${idProject}/${(!users || users.length === 0) ? '000' : users}`);
  } 

}
