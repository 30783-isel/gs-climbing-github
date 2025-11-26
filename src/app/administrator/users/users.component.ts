import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/models/user.model';
import { Project } from 'src/app/models/project.model';


import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  projects: Project[];
  addForm: FormGroup;
  filterForm: FormGroup;
  value: string;
  value10: string[] = [];
  idUser: string;
  list_projects: Project[];
  list_user_projects: Project[];
  showSearchBox : boolean = false;

  constructor(private userService: UserService, private projectService: ProjectService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData();
    this.addForm = this.formBuilder.group({
      project: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      active: ['', Validators.required],
      roles: ['', Validators.required]
    });
    this.filterForm = this.formBuilder.group({
      name: [null],
      username: [null],
      email: [null],
      roles: [null],
    });
    this.projectService.getAllProjects().subscribe(data => {
      this.list_projects = data;
    });
  }

  onSubmit() {
    this.userService.createUser(this.addForm.value).subscribe(data => {
      this.loadData();
      this.addForm.reset();
      $('#modalAddUser').modal('hide');
      $("#formAddUser")[0].reset();
    },
      error => {
        alert(error.error);
      });
  }

  setUser(name: string) {
    this.userService.getUser(name).subscribe(data => {
      $('#user-id').val(data.idUser);
      $('#name').val(data.name);
      $('#email').val(data.email);
      $('#username').val(data.username);
      $('#roles').val(data.roles);
    });
  }

  addProjectsUser(name: string) {
    this.userService.getUser(name).subscribe(
      data => {
        $('#user-name-id').html(data.username);
        $('#user-id').val(data.idUser);
        this.idUser = data.idUser;
        this.getUserProject(data.idUser);
      });
  }

  getUserProject(userId: string) {
    $('.projects-id').prop('checked', false);
    this.userService.getUserProject(userId).subscribe(data => {
      this.list_user_projects = data;
      this.getAlllProjects();
    });
  }

  getAlllProjects() {
    this.projectService.getAllProjects().subscribe(data => {
      this.list_projects = data;
      this.list_projects.forEach(project => {
        this.list_user_projects.forEach(user_projects => {
          if (user_projects.idProject === project.idProject) {
            $('input[value=' + project.idProject + ']').prop('checked', true);
          }
        })
      });
    });
  }

  updateUser() {
    let userId = $('#user-id').val();
    let projectsId = [];
    $('.projects-id:checkbox:checked').each(function () {
      let val = $(this).val();
      projectsId.push(val);
    });
    let projects = projectsId.join('-');
    this.userService.updateUser(userId, projects).subscribe(data => {
    },
      error => {
        alert(error.error);
      });
  }
  loadData() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
  getUpdatedvalue($event) {
    this.users = $event;
  }

  showUser(username : string){
    console.log(username);
  }

  showSearch(){
    this.showSearchBox = !this.showSearchBox;
    if(!this.showSearchBox){
       this.loadData();
    }
  }

  filterProjects() {
    this.userService.filterUsers(this.filterForm.value).subscribe(data => {
      this.users = data;
      this.filterForm.reset();
      $("#formFilterProject")[0].reset();
    },
      error => {
        alert(error.error);
      });
  }

}
