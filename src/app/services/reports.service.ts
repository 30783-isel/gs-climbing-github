import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { GlobalConstants } from 'src/app/commons/global-constants';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private permissionUrl: string;
  private permissionGrantedUrl: string;
  private deleteReportUrl: string;
  private reportUrl: string;
  private historicUrl: string;

  constructor(private http : HttpClient) { 
    this.deleteReportUrl = GlobalConstants.baseReportsUrl + 'delete-report';
    this.permissionUrl = GlobalConstants.baseReportsUrl + 'permission2edit';
    this.permissionGrantedUrl = GlobalConstants.baseReportsUrl + 'permission2edit_granted';
    this.reportUrl = GlobalConstants.baseReportsUrl + 'report';
    this.historicUrl = GlobalConstants.baseReportsUrl + 'historic';
  }

  public getHistoric(id: number): Observable<any> {
    return this.http.get(`${this.historicUrl}/${id}`);
  }

  public deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.deleteReportUrl}/${id}`, { responseType: 'text' });
  }

  public askForUpdatePermission(id: number): Observable<any> {
    return this.http.get(`${this.permissionUrl}/${id}`);
  }
  
  public updatePermissionGranted(id: number): Observable<any> {
    return this.http.get(`${this.permissionGrantedUrl}/${id}`);
  }

  public getReport(id: number): Observable<any> {
    return this.http.get(`${this.reportUrl}/${id}`);
  }

  uploadReport(file: File, projectId: string, turbineId: string, typeReport : string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('project', projectId);
    formData.append('turbineId', turbineId);
    formData.append('typeReport', typeReport);

    const req = new HttpRequest('POST', GlobalConstants.baseReportsUrl + 'upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  updateReport(file: File, id: number, typeReport : number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idReport', id.toString());
    formData.append('typeReport', typeReport.toString());
    const req = new HttpRequest('POST', GlobalConstants.baseReportsUrl + 'update', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
