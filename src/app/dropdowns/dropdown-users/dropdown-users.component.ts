import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

import * as $ from "jquery";
import { UsersComponent } from 'src/app/administrator/users/users.component';
declare  var jQuery:  any;

@Component({
  selector: 'app-dropdown-users',
  templateUrl: './dropdown-users.component.html',
  styleUrls: ['./dropdown-users.component.css']
})
export class DropdownUsersComponent implements OnInit {

  @Input() user : User;
  @Output() valueUpdate = new EventEmitter<User[]>();
  editForm: FormGroup;
  
  constructor(private userService: UserService, public translate: TranslateService, private router : Router, private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(){
    (function ($) {
      $(document).ready(function(){
         $('.dropdown-toggle').click(function() {
          $('.dropdown-content').removeClass('show');
          $(this).siblings("div.dropdown-content").toggleClass('show');
        });

      });
    })(jQuery);


    this.editForm = this.formBuilder.group({
      idUser: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      active: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
    
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!$('.dropdown-toggle').is(event.target) && $('.dropdown-toggle').has(event.target).length === 0 && $('.show').has(event.target).length === 0) {
      $('.dropdown-content').removeClass('show');
    }
  }

  deleteUser( name : string){
    this.userService.deleteUser(name).subscribe(
      data => {
        this.loadData();
      });
  }

  editUser( name : string){
    jQuery('#modalEditUser').modal('show'); 
    jQuery("#formEditUser")[0].reset();
    this.userService.getUser(name).subscribe(
      data => {
        let usersComponent = new UsersComponent(this.userService, this.projectService, this.formBuilder);
        usersComponent.setUser(name);
      });
  }


  updateTurbine() {
    let turbineId = $('#editTurbineId').val();
    let name = $('#name-turbine').val();
    const formData: FormData = new FormData();
    formData.append('turbineId', turbineId);
    formData.append('name', name);

    this.projectService.updateTurbineName(formData).subscribe(data => {
    },
      error => {
        alert(error.error);
      });
  }

  onSubmit() {  
    let idUser = $('#user-id').val();
    let name = $('#name').val();
    let username = $('#username').val();
    let email = $('#email').val();
    let roles = $('#roles').val();
    const formData: FormData = new FormData();
    formData.append('userId', idUser);
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('roles', roles);
    this.userService.updateUserData(formData).subscribe(data => {
      this.loadData();
      this.editForm.reset();
      jQuery('#modalEditUser').modal('hide');
      jQuery("#formEditUser")[0].reset();
    },
      error => {
        alert(error.error);
      });
  }

  closeModal(){
    jQuery("#formEditUser")[0].reset();
    console.log('teste')
  }

  loadData() {
    this.userService.getAllUsers().subscribe(data => {
      this.valueUpdate.emit(data);
    });
  }

  addProjectsUser( name : string){
    let usersComponent = new UsersComponent(this.userService, this.projectService, this.formBuilder);
    usersComponent.addProjectsUser(name);
  }

}
