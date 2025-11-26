import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { ProjectService } from 'src/app/services/project.service';
import { Turbine } from 'src/app/models/turbine.model';
import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';

import * as $ from "jquery";
import { Report } from '../models/report.model';
declare var jQuery: any;

@Component({
  selector: 'app-show-turbines',
  templateUrl: './show-turbines.component.html',
  styleUrls: ['./show-turbines.component.css']
})
export class ShowTurbinesComponent implements OnInit {

  id: string;
  turbine: string;
  turbines: Turbine[];
  turbineSelected: Turbine;
  message: string;
  subscription: Subscription;

  defectInspectionsReport : Report;
  examinationTransformer : Report;
  measurements690V400V : Report;
  measurements6KV : Report;
  measurementsMwSwitchgear : Report;
  onboardCraneInspectionReport : Report;
  performanceReportRepairElevator : Report;
  statutoryInspectionReport : Report;

  private subscriptionTurbineId: Subscription; //important to create a subscription

  constructor(private sharedService: SharedServiceService, private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private reportsService: ReportsService) { }

  ngOnInit() {
    this.subscription = this.sharedService.currentMessage.subscribe(message => this.message = message);
    this.id = this.route.snapshot.params['id'];
    this.turbine = this.route.snapshot.params['turbine'];
    this.projectService.getTurbines(this.id).subscribe(data => {
      this.turbines = data;
      if (this.turbine != null) {
        this.showTurbineReports(this.turbine);
      }else{
        this.showTurbineReports(this.turbines[0].id);
      }
    });


    // subscribe to sender component messages
    this.subscriptionTurbineId= this.sharedService.getUpdateObservableTurbineId().subscribe(message => { //message contains the data sent from service
    let turbineId = message.turbineId;
    this.showTurbineReports(turbineId);
    });

  }

  getUpdatedvalue($event) {
    this.turbines = $event;
  }

  getUpdatedvalueReports($event) {
    this.showTurbineReports($event);
  }

  setProject(name: string) {
    $('#turbineId').val(name);
    this.projectService.getTurbine(name).subscribe(data => {
      $('#defects-inspection-report').prop('checked', data.defectsInspectionReport);
      $('#examination-transformer').prop('checked', data.examinationTransformer);
      $('#measurements-6KV').prop('checked', data.measurements6KV);
      $('#measurements-690V400V').prop('checked', data.measurements690V400V);
      $('#measurements-mw-switchgear').prop('checked', data.measurementsMwSwitchgear);
      $('#onboard-crane-inspection-report').prop('checked', data.onboardCraneInspectionReport);
      $('#performance-report-repair-elevator').prop('checked', data.performanceReportRepairElevator);
      $('#statutory-inspection-report').prop('checked', data.statutoryInspectionReport);
    });
  }

  editTurbine(name: string) {
    $('#editTurbineId').val(name);
    this.projectService.getTurbine(name).subscribe(data => {
      $('#name-turbine').val(data.name);
    });
  }

  addReports2Turbine() {

    let turbineId = $('#turbineId').val();
    let defectsInspectionReport = $('#defects-inspection-report').is(":checked");
    let examinationTransformer = $('#examination-transformer').is(":checked");
    let measurements6KV = $('#measurements-6KV').is(":checked");
    let measurements690V400V = $('#measurements-690V400V').is(":checked");
    let measurementsMwSwitchgear = $('#measurements-mw-switchgear').is(":checked");
    let onboardCraneInspectionReport = $('#onboard-crane-inspection-report').is(":checked");
    let performanceReportRepairElevator = $('#performance-report-repair-elevator').is(":checked");
    let statutoryInspectionReport = $('#statutory-inspection-report').is(":checked");

    const formData: FormData = new FormData();
    formData.append('turbineId', turbineId);
    formData.append('defectsInspectionReport', defectsInspectionReport);
    formData.append('examinationTransformer', examinationTransformer);
    formData.append('measurements6KV', measurements6KV);
    formData.append('measurements690V400V', measurements690V400V);
    formData.append('measurementsMwSwitchgear', measurementsMwSwitchgear);
    formData.append('onboardCraneInspectionReport', onboardCraneInspectionReport);
    formData.append('performanceReportRepairElevator', performanceReportRepairElevator);
    formData.append('statutoryInspectionReport', statutoryInspectionReport);
    this.projectService.updateTurbine(formData).subscribe(data => {
    },
      error => {
        alert(error.error);
      });
  }

  updateTurbine() {

    let turbineId = $('#editTurbineId').val();
    let name = $('#name-turbine').val();


    const formData: FormData = new FormData();
    formData.append('turbineId', turbineId);
    formData.append('name', name);

    this.projectService.updateTurbineName(formData).subscribe(data => {
      this.projectService.getTurbines(this.id).subscribe(data => {
        this.turbines = data;
        if (this.turbine != null) {
          this.showTurbineReports(this.turbine);
        }else{
          this.showTurbineReports(this.turbines[0].id);
        }
      });
    },
      error => {
        alert(error.error);
      });
  }

  go_back() {
    if (this.message == 'admin') {
      this.router.navigate(['/administrator']);
    } else {
      this.router.navigate(['/technician']);
    }
  }

  showTurbineReports(turbineId: string) {
    this.projectService.getTurbine(turbineId).subscribe(data => {
      this.turbineSelected = data;
    },
      error => {
        alert(error.error);
      });
    this.projectService.getTurbine(turbineId).subscribe(data => {
      this.defectInspectionsReport          = data.listReports.filter(x => x.typeReport == 0).length > 0 ? data.listReports.filter(x => x.typeReport == 0)[0] : null;
      this.examinationTransformer           = data.listReports.filter(x => x.typeReport == 1).length > 0 ? data.listReports.filter(x => x.typeReport == 1)[0] : null;
      this.measurementsMwSwitchgear         = data.listReports.filter(x => x.typeReport == 2).length > 0 ? data.listReports.filter(x => x.typeReport == 2)[0] : null;
      this.measurements6KV                  = data.listReports.filter(x => x.typeReport == 3).length > 0 ? data.listReports.filter(x => x.typeReport == 3)[0] : null;
      this.measurements690V400V             = data.listReports.filter(x => x.typeReport == 4).length > 0 ? data.listReports.filter(x => x.typeReport == 4)[0] : null;
      this.onboardCraneInspectionReport     = data.listReports.filter(x => x.typeReport == 5).length > 0 ? data.listReports.filter(x => x.typeReport == 5)[0] : null;
      this.performanceReportRepairElevator  = data.listReports.filter(x => x.typeReport == 6).length > 0 ? data.listReports.filter(x => x.typeReport == 6)[0] : null;
      this.statutoryInspectionReport        = data.listReports.filter(x => x.typeReport == 7).length > 0 ? data.listReports.filter(x => x.typeReport == 7)[0] : null;
    },
    error => {
      alert(error.error);
    });
  }

}
