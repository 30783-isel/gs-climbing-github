import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/commons/global-constants';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  private downloadZipFileUrl: string;
  private downloadFileByIdUrl: string;
  private downloadCleanZipFileUrl: string;

  constructor(private http: HttpClient) { 
    this.downloadZipFileUrl = GlobalConstants.baseFilesUrl + 'download_zip';
    this.downloadFileByIdUrl = GlobalConstants.baseFilesUrl + 'download_pdf';
    this.downloadCleanZipFileUrl = GlobalConstants.baseFilesUrl + 'download_clean_zip';
  }

  downloadZipFile(projectName: string) {
    let url = `${this.downloadZipFileUrl}/${projectName}`;
    return this.http.get<Blob>(url, { observe: 'response', responseType: 'blob' as 'json' })
  }

  downloadCleanZipFile(projectName: string) {
    let url = `${this.downloadCleanZipFileUrl}/${projectName}`;
    return this.http.get<Blob>(url, { observe: 'response', responseType: 'blob' as 'json' })
  }

  downloadFileServiceByReportId(id : string, typeReport : string) {
    let url = `${this.downloadFileByIdUrl}/${typeReport}/${id}`;
    return this.http.get<Blob>( url, { observe: 'response', responseType: 'blob' as 'json' })
  }



}
