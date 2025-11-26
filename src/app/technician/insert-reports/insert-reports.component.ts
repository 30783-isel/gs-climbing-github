import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Turbine } from 'src/app/models/turbine.model';
import { FileService } from 'src/app/services/file.service';
import { ProjectService } from 'src/app/services/project.service';
import { ReportsService } from 'src/app/services/reports.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/login/auth.service';
import { ReportsEnum } from 'src/app/commons/reports-enum.enum';

import * as $ from "jquery";
import { Report } from 'src/app/models/report.model';
import { GlobalConstants } from 'src/app/commons/global-constants';
declare var jQuery: any;

@Component({
  selector: 'app-insert-reports',
  templateUrl: './insert-reports.component.html',
  styleUrls: ['./insert-reports.component.css']
})

export class InsertReportsComponent implements OnInit {
  typeReport : string;
  projects: Project[];
  project: Project;
  turbines: Turbine[];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  i = 0;
  turbineId = '0';
  projectSelected: boolean;
  id: string;
  showProgressBar : boolean;

  report: Report;

  showDefectInspectionReport: boolean[] = [];
  insertedDefectInspectionReport: boolean[] = [];

  showExaminationTransformer: boolean[] = [];
  insertedExaminationTransformer: boolean[] = [];

  showMeasurementsMwSwitchgear: boolean[] = [];
  insertedMeasurementsMwSwitchgear: boolean[] = [];

  showMeasurementsM6Kv: boolean[] = [];
  insertedMeasurementsM6Kv: boolean[] = [];

  showMeasurements690V400V: boolean[] = [];
  insertedMeasurements690V400V: boolean[] = [];

  showOnboardCraneInspectionReport: boolean[] = [];
  insertedOnboardCraneInspectionReport: boolean[] = [];

  showPerformanceReportRepairElevator: boolean[] = [];
  insertedPerformanceReportRepairElevator: boolean[] = [];

  showStatutoryInspectionReport: boolean[] = [];
  insertedStatutoryInspectionReport: boolean[] = [];

  title: string;

  constructor(private projectService: ProjectService, private fileService: FileService, private reportService: ReportsService, private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    this.projectSelected = false;
    this.id = this.authenticationService.getLoggedInUserName();
    this.projectService.getAllProjectsByUserId(this.id).subscribe(data => {
      this.projects = data;
      console.log(ReportsEnum);
      console.log(ReportsEnum[0]);
      console.log(ReportsEnum["DIR"]);
      console.log(ReportsEnum.DIR);
      const index: number = Object.keys(ReportsEnum).indexOf('DIR');
      console.log(index);
      ReportsEnum
    });
  }

  public get reportsEnum(): typeof ReportsEnum {
    return ReportsEnum; 
  }

  uploadReport() {
    this.progress = 0;
    this.showProgressBar = true;
    let projectName = $('#aantal').val();
    let turbineIdDialog = $('#turbineIdDialog').val();
    this.currentFile = this.selectedFiles.item(0);
    this.reportService.uploadReport(this.currentFile, projectName, this.turbineId, this.typeReport).subscribe(
      data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * data.loaded / data.total);
        } else if (data.type === HttpEventType.Response) {
          this.report = data.body.defectsInspectionReportOnTurbine;
          this.updateProjectValues(projectName);
          this.progress = 0;
          this.showProgressBar = false;
          jQuery("#modalInsertReport").modal("hide");
        }
      },
      err => {
        this.progress = 0;
        this.showProgressBar = false;
        this.message = err.error;
        jQuery('#modalInvalidReport').modal('show'); 
        this.currentFile = undefined;
      },
      () => {
      }
    );
    $('.custom-file-label').text('');
  }

  changeTypeReport(typeReport : number) {
    this.typeReport = typeReport.toString();
    this.title = GlobalConstants.getReportNameByType(typeReport);
  }

  changeValue(e) {
    this.updateProjectValues(e.target.value);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  private updateProjectValues(idProject: string) {
    this.projectService.getProject(parseInt(idProject)).subscribe(data => {
      this.project = data;
      this.projectSelected = true;
    });

    this.projectService.getTurbines(idProject).subscribe(data => {
      this.turbines = data;
      if(this.turbineId === '0' && this.turbines.length > 0){
        this.turbineId = this.turbines[0].id;
      }
      this.turbines.forEach((turbine, i) => {
        this.prepareDefectInspectionReport(turbine, i);
        this.prepareExaminationTransformer(turbine, i);
        this.prepareMeasurementsMwSwitchgear(turbine, i);
        this.prepareMeasurementsM6Kv(turbine, i);
        this.prepareMeasurements690V400V(turbine, i);
        this.prepareOnboardCraneInspectionReport(turbine, i);
        this.prepareStatutoryInspectionReport(turbine, i); 
        this.preparePerformanceReportRepairElevator(turbine, i);
      });
    });
  }

  prepareDefectInspectionReport(turbine: Turbine, i: number) {
    if (turbine.defectsInspectionReport) {
      this.showDefectInspectionReport[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 0).length > 0) {
        this.insertedDefectInspectionReport[i] = true;
      } else {
        this.insertedDefectInspectionReport[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileReport").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showDefectInspectionReport[i] = false;
    }
  }

  prepareExaminationTransformer(turbine: Turbine, i: number) {

    if (turbine.examinationTransformer) {
      this.showExaminationTransformer[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 1).length > 0) {
        this.insertedExaminationTransformer[i] = true;
      } else {
        this.insertedExaminationTransformer[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileReport").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });

        });
      })(jQuery);
    } else {
      this.showExaminationTransformer[i] = false;
    }
  }

  prepareMeasurementsMwSwitchgear(turbine: Turbine, i: number) {
    if (turbine.measurementsMwSwitchgear) {
      this.showMeasurementsMwSwitchgear[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 2).length > 0) {
        this.insertedMeasurementsMwSwitchgear[i] = true;
      } else {
        this.insertedMeasurementsMwSwitchgear[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showMeasurementsMwSwitchgear[i] = false;
    }
  }

  prepareMeasurementsM6Kv(turbine: Turbine, i: number) {
    if (turbine.measurements6KV) {
      this.showMeasurementsM6Kv[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 3).length > 0) {
        this.insertedMeasurementsM6Kv[i] = true;
      } else {
        this.insertedMeasurementsM6Kv[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showMeasurementsM6Kv[i] = false;
    }
  }

  prepareMeasurements690V400V(turbine: Turbine, i: number) {
    if (turbine.measurements690V400V) {
      this.showMeasurements690V400V[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 4).length > 0) {
        this.insertedMeasurements690V400V[i] = true;
      } else {
        this.insertedMeasurements690V400V[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showMeasurements690V400V[i] = false;
    }
  }

  prepareOnboardCraneInspectionReport(turbine: Turbine, i: number) {
    if (turbine.onboardCraneInspectionReport) {
      this.showOnboardCraneInspectionReport[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 5).length > 0) {
        this.insertedOnboardCraneInspectionReport[i] = true;
      } else {
        this.insertedOnboardCraneInspectionReport[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showOnboardCraneInspectionReport[i] = false;
    }
  }

  preparePerformanceReportRepairElevator(turbine: Turbine, i: number) {
    if (turbine.performanceReportRepairElevator) {
      this.showPerformanceReportRepairElevator[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 6).length > 0) {
        this.insertedPerformanceReportRepairElevator[i] = true;
      } else {
        this.insertedPerformanceReportRepairElevator[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showPerformanceReportRepairElevator[i] = false;
    }
  }

  prepareStatutoryInspectionReport(turbine: Turbine, i: number) {
    if (turbine.statutoryInspectionReport) {
      this.showStatutoryInspectionReport[i] = true;
      if (turbine.listReports.filter(report => report.typeReport == 7).length > 0) {
        this.insertedStatutoryInspectionReport[i] = true;
      } else {
        this.insertedStatutoryInspectionReport[i] = false;
      }
      (function ($) {
        $(document).ready(function () {
          $("#fileMeasurementsMwSwitchgear").on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
          });
          $(document).on("click", ".open-InsertReportDialog", function () {
            var turbineId = $(this).get(0).id;
            $("#turbineIdDialog").val(turbineId);
          });
        });
      })(jQuery);
    } else {
      this.showStatutoryInspectionReport[i] = false;
    }
  }

  public downloadCleanReports(projectName: string, projectId: string) {
    this.fileService.downloadCleanZipFile(projectId).subscribe(
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

  showTurbineReports(turbineId: string, idx: number) {
    this.i = idx;
    this.turbineId = turbineId;
  }
}