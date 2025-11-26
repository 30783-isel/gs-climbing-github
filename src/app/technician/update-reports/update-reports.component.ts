import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/commons/global-constants';

import { Report } from 'src/app/models/report.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { FileService } from 'src/app/services/file.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SharedServiceService } from "src/app/services/shared-service.service";
import { Subject, Subscription } from 'rxjs';

import { Observable } from 'rxjs/';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as $ from "jquery";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Component({
  selector: 'app-update-reports',
  templateUrl: './update-reports.component.html',
  styleUrls: ['./update-reports.component.css']
})
export class UpdateReportsComponent implements OnInit {

  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string;
  message: string;

  reportId: number;
  id: number;
  selectedFiles: FileList;
  idHistoric: string;
  permission2Edit: boolean;
  locked: boolean;
  report: Report;
  isTechnician: boolean;
  typePerson: string;
  currentFile: File;
  message_ = '';
  progress = 0;
  subscription: Subscription;

  constructor(private activeModal: NgbActiveModal, private sharedService: SharedServiceService, private router: Router, private reportsService: ReportsService) { }

  ngOnInit() {
    this.subscription = this.sharedService.currentMessage.subscribe(typePerson => this.typePerson = typePerson);
    this.id = this.report.reportId;
    this.permission2Edit = (this.report.permission2Edit.toLowerCase() === 'true');
    this.locked = (this.report.locked.toLowerCase() === 'true');
    this.isTechnician = (this.typePerson == 'admin') ? false : true;

    this.title = GlobalConstants.getReportNameByType(this.report.typeReport);
    
    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      let modalHeader = $('.modal-header');
      modalHeader.addClass('cursor-all-scroll');

      /*modalContent.draggable({
        handle: '.modal-header'
      });
      */
    });


    (function ($) {
      $(document).ready(function () {
        $("#fileReport").on('change', function () {
          var fileName = $(this).val();
          $(this).next('.custom-file-label').html(fileName);
        });
      });
    })(jQuery);

  }

  close() {
    this.activeModal.close();
    this.onSubmitSubject.next(true);
  }

  askForUpdatePermission() {
    this.reportsService.askForUpdatePermission(this.id)
      .subscribe(data => {
        this.permission2Edit = data.permission2Edit;
        this.locked = data.locked;
      }, error => console.log(error));
  }

  selectFilex(event) {
    this.selectedFiles = event.target.files;
  }

  updateReport() {
    this.progress = 0;

    let projectName = $('#aantal').val();
    let turbineIdDialog = $('#turbineIdDialog').val();
    this.currentFile = this.selectedFiles.item(0);
    this.reportsService.updateReport(this.currentFile, this.id, this.report.typeReport).subscribe(
      data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * data.loaded / data.total);
        } else if (data.type === HttpEventType.Response) {
          //this.message = data.body.message;
          //this.fileInfos = this.uploadService.getFiles();
          this.updateObservableTurbineId();
          this.activeModal.close();
          this.onSubmitSubject.next(true);
          this.progress = 0;
        }
      },
      err => {
        this.progress = 0;
        this.message = err.error;
        alert(err.error);
        this.currentFile = undefined;
      },
      () => {

      }
    );
    $('.custom-file-label').text('');
  }


  updateObservableTurbineId(): void {
    // send message to subscribers via observable subject
    this.sharedService.setUpdateObservableTurbineId(this.report.turbinaId.toString());
  }

}
