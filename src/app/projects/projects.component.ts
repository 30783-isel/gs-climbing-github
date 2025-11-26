import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app//login/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';


import * as $ from 'jquery';
import { Turbine } from '../models/turbine.model';
import { User } from '../models/user.model';
declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  isShown: boolean = false;

  project: Project;
  projects: Project[];
  usersProject: User[];
  users: User[];
  addForm: FormGroup;
  filterForm: FormGroup;
  id: string;
  message: string;
  subscription: Subscription;
  turbine : string;
  turbines : Turbine[];
  showSearchBox : boolean = false;

  constructor(private userService: UserService, private projectService: ProjectService, private authenticationService: AuthenticationService, private sharedService: SharedServiceService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.subscription = this.sharedService.currentMessage.subscribe(message => this.message = message);
    this.loadData();
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      location: ['', Validators.required],
      numberTurbines: ['', Validators.required],
      site: ['', Validators.required],
      number: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.filterForm = this.formBuilder.group({
      name: [null],
      country: [null],
      location: [null],
      site: [null],
      number: [null],
      type: [null],
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data.filter(this.isTechnician);;
    });
  }

  initShowTurbines(id: string){
    this.projectService.getTurbines(id).subscribe(data => {
      this.turbines = data;
    });

  }

  getUpdatedvalue($event) {
    this.projects = $event;
  }

  loadData() {
    this.id = this.authenticationService.getLoggedInUserName();
    this.projectService.getAllProjectsByUserId(this.id).subscribe(data => {
      this.projects = data;
    });
  }

  showSearch(){
    this.showSearchBox = !this.showSearchBox;
    if(!this.showSearchBox){
       this.loadData();
    }
  }

  onSubmit() {
    this.projectService.createProject(this.addForm.value).subscribe(data => {
      this.loadData();
      this.isShown = false;
      this.addForm.reset();
      $('#modalAddProject').modal('hide');
      $("#formAddProject")[0].reset();
    },
      error => {
        alert(error.error);
      });
  }


  filterProjects() {
    this.projectService.filterProject(this.filterForm.value).subscribe(data => {
      this.projects = data;
      this.isShown = false;
      this.filterForm.reset();
      $("#formFilterProject")[0].reset();
    },
      error => {
        alert(error.error);
      });
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  addProjectsUser(idProject: string) {
    this.projectService.getProject(Number(idProject)).subscribe(data => {
      this.project = data;
      this.usersProject = data.users.filter(this.isTechnician);
      $('#project-id').val(this.project.idProject);
      this.userService.getAllUsers().subscribe(data => {
        data.forEach(user => {
          this.usersProject.forEach(userProject => {
            if (userProject.idUser === user.idUser) {
              $('input[value=' + user.idUser + ']').prop('checked', true);
            }
          })
        });
      });
    },
      error => {
        alert(error.error);
      });
  }

  private isTechnician(value) {
    return value.roles === 'TECH';
  }
  
  

  updateUser() {
    let projectId = $('#project-id').val();
    let usersId = [];
    $('.users-id:checkbox:checked').each(function () {
      let val = $(this).val();
      usersId.push(val);
    });
    let users = usersId.join('-');
    this.projectService.updateUsersProject(projectId, users).subscribe(data => {
    },
      error => {
        alert(error.error);
      });
  }

 
}
