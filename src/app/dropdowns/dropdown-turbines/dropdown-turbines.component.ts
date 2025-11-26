import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Turbine } from 'src/app/models/turbine.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportsService } from 'src/app/services/reports.service';
import { FormBuilder } from "@angular/forms";
import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';

import * as $ from "jquery";
import { ShowTurbinesComponent } from 'src/app/show-turbines/show-turbines.component';
declare var jQuery: any;

@Component({
  selector: 'app-dropdown-turbines',
  templateUrl: './dropdown-turbines.component.html',
  styleUrls: ['./dropdown-turbines.component.css']
})
export class DropdownTurbinesComponent implements OnInit {

  @Input() turbine: Turbine;
  @Output() valueUpdate = new EventEmitter<Turbine[]>();
  formBuilder: FormBuilder;

  message:string;
  subscription: Subscription;
  projectId : string;

  constructor(private sharedService: SharedServiceService, private projectService: ProjectService, formBuilder: FormBuilder, public translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute, private reportsService : ReportsService) { }

  ngOnInit() {
    (function ($) {
      $(document).ready(function () {
        $('.dropdown-toggle').click(function () {
          $('.dropdown-content').removeClass('show');
          $(this).siblings("div.dropdown-content").toggleClass('show');
        });

      });
    })(jQuery);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!$('.dropdown-toggle').is(event.target) && $('.dropdown-toggle').has(event.target).length === 0 && $('.show').has(event.target).length === 0) {
      $('.dropdown-content').removeClass('show');
    }
  }

  deleteTurbine(turbine: Turbine) {
    this.projectId = turbine.project.idProject;
    this.projectService.deleteTurbine(turbine.id).subscribe(
      data => {
        this.loadData(this.projectId);
      },
      error => {
        alert(error.error);
      });
  }

  getTurbine(id: string) {  
    let showTurbinesComponent = new ShowTurbinesComponent(this.sharedService, this.activatedRoute, this.router, this.projectService, this.reportsService);
    showTurbinesComponent.setProject(id);
  }

  editTurbine(id: string) {  
    let showTurbinesComponent = new ShowTurbinesComponent(this.sharedService, this.activatedRoute, this.router, this.projectService, this.reportsService);
    showTurbinesComponent.editTurbine(id);
  }

  loadData(projectId : string) {
    this.projectService.getTurbines(projectId).subscribe(data => {
      this.valueUpdate.emit(data);
    });
  }

}
