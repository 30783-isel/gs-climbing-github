import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FileService } from 'src/app/services/file.service';
import { HttpResponse } from '@angular/common/http';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportsService } from 'src/app/services/reports.service';
import { AuthenticationService } from 'src/app//login/auth.service';
import { FormBuilder } from "@angular/forms";

import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';

import * as $ from "jquery";
import { ShowTurbinesComponent } from 'src/app/show-turbines/show-turbines.component';
import { ProjectsComponent } from 'src/app/projects/projects.component';
import { UserService } from 'src/app/services/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-dropdown-projects',
  templateUrl: './dropdown-projects.component.html',
  styleUrls: ['./dropdown-projects.component.css']
})
export class DropdownProjectsComponent implements OnInit {

  @Input() project: Project;
  @Output() valueUpdate = new EventEmitter<Project[]>();
  formBuilder: FormBuilder;

  message:string;
  subscription: Subscription;

  constructor( private userService : UserService, private authenticationService : AuthenticationService, private FormBuilder : FormBuilder,  private route: ActivatedRoute,private router: Router, private reportsService : ReportsService, private sharedService: SharedServiceService, private projectService: ProjectService, public translate: TranslateService, private fileService : FileService ) { }
  ngOnInit() {
    (function ($) {
      $(document).ready(function () {
        $('.dropdown-toggle').click(function () {
          $('.dropdown-content').removeClass('show');
          $(this).siblings("div.dropdown-content").toggleClass('show');
        });

      });
    })(jQuery);
    this.subscription = this.sharedService.currentMessage.subscribe(message => this.message = message);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!$('.dropdown-toggle').is(event.target) && $('.dropdown-toggle').has(event.target).length === 0 && $('.show').has(event.target).length === 0) {
      $('.dropdown-content').removeClass('show');
    }
  }

  deleteProject(name: string) {
    this.projectService.deleteProjects(name).subscribe(
      data => {
        this.loadData();
      },
      error => {
        alert(error.error);
      });
  }

  loadData() {
    this.projectService.getAllProjects().subscribe(data => {
      this.valueUpdate.emit(data);
    });
  }

  public showTurbines(id: string) {
    this.router.navigate(['show-turbines', id]);
  }

  addTurbine(id: string) {
    this.projectService.addTurbine(id).subscribe(
      data => {
        this.loadData();
      },
      error => {
        alert(error.error);
      });
  }

  public downloadReports(projectName : string){
    this.fileService.downloadZipFile( projectName ).subscribe(
      (response: HttpResponse<Blob>) => {
        let filename: string = projectName + '.zip';
        let binaryData = [];
        binaryData.push(response.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  addProjectsUser( idProject : string){

    let projectComponent = new ProjectsComponent(this.userService , this. projectService, this.authenticationService, this.sharedService, this.formBuilder);
    projectComponent.addProjectsUser(idProject);
  }

}
