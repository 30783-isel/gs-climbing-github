import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { ModalConfig } from '../../commons/modal-config';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Report } from 'src/app/models/report.model';

import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subscription } from 'rxjs';

import { FileService } from 'src/app/services/file.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

import { UpdateReportsComponent } from 'src/app/technician/update-reports/update-reports.component';

import * as $ from "jquery";
declare var jQuery: any;

@Component({
  selector: 'app-dropdown-reports',
  templateUrl: './dropdown-reports.component.html',
  styleUrls: ['./dropdown-reports.component.css']
})
export class DropdownReportsComponent implements OnInit {

  @Input() report: Report;
  @Output() valueUpdate = new EventEmitter<string>();

  message: string;
  subscription: Subscription;
  buttonText: string = 'Open Modal';
  modalRef: any;
  modalOptions: NgbModalOptions = ModalConfig;

  constructor(private modalService: NgbModal, private projectService: ProjectService, private activatedRoute: ActivatedRoute, private reportsService: ReportsService, private fileService: FileService, private sharedService: SharedServiceService, private router: Router, public translate: TranslateService) { }

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

  openModal() {
    this.modalRef = this.modalService.open(UpdateReportsComponent, this.modalOptions);
    this.modalRef.componentInstance.title = 'Drag Me!';
    this.modalRef.componentInstance.message = 'Try dragging this modal around using the modal header!';
    this.modalRef.componentInstance.report = this.report;
    this.modalRef.componentInstance.onSubmitSubject
      .subscribe((res: boolean) => {
        this.buttonText = 'Open Modal Again!';
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!$('.dropdown-toggle').is(event.target) && $('.dropdown-toggle').has(event.target).length === 0 && $('.show').has(event.target).length === 0) {
      $('.dropdown-content').removeClass('show');
    }
  }

  public deleteReport(id: number) {
    this.reportsService.deleteReport(id).subscribe(
      data => {
        this.projectService.getTurbine(data).subscribe(data => {
          this.valueUpdate.emit(data.id);
        },
          error => {
            alert(error.error);
          });
      },
      error => {
        console.log(error)
      });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  public historicReport(id: number) {
    this.router.navigate(['historic', id]);
  }

  getFileName(response: HttpResponse<Blob>) {
    let filename: string;
    try {
      const contentDisposition: string = response.headers.get('content-disposition');
      const r = /(?:filename=")(.+)(?:")/
      filename = r.exec(contentDisposition)[1];
    }
    catch (e) {
      filename = 'Defect Inspection Report.pdf'
    }
    return filename
  }


  downloadFile( id: string, typeReport : string) {
    this.fileService.downloadFileServiceByReportId(id, typeReport)
      .subscribe(
        (response: HttpResponse<Blob>) => {
          let filename : string;
          switch(parseInt(typeReport)) {
            case 0:
              filename = "Defect Inspection Report.pdf"
              break;
            case 1:
              filename = "Examination transformer.pdf"
              break;
            case 2:
              filename = "Measurements of MV Switchgear and Stator Cabinet.pdf";
              break;
            case 3:
              filename = "Medidas 6Kv.pdf";
              break;
            case 4:
              filename = "Medidas 690V400V.pdf";
              break;
            case 5:
              filename = "Onboard crane Inspection Report.pdf";
              break;
            case 6:
              filename = "Performance Report Repair Elevator.pdf";
              break;
            case 7:
              filename = "Statutory Inspection Report.pdf";
              break;
          } 
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

  updatePermissionGranted(id: number) {
    this.reportsService.updatePermissionGranted(id)
      .subscribe(
        data => {
          this.valueUpdate.emit(data.turbinaId);
        },
        error => {
          console.log(error)
        });
  }

}
