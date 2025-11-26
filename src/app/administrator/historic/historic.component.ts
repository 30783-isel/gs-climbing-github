import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'src/app/models/report.model';
import { Historic } from 'src/app/models/historic/historic.model';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  id: number;
  report: Report;
  listHistorics: Historic[];

  constructor(private reportsService: ReportsService, public translate: TranslateService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.reportsService.getReport(this.id)
      .subscribe(data => {
        this.report = data;
      }, error => console.log(error));

    this.reportsService.getHistoric(this.id)
      .subscribe(data => {
        this.listHistorics = data;
        for (let i = 0; i < this.listHistorics.length; i++) {
          // console.log(this.listHistorics[i]);
          for (let j = 0; j < this.listHistorics[i].listAlterations.length; j++) {
            // console.log(this.listHistorics[i].listAlterations[j]);
            if (this.listHistorics[i].listAlterations[j].newPicByte != null) {
              this.listHistorics[i].listAlterations[j].newPicByte = 'data:image/jpeg;base64,' + this.listHistorics[i].listAlterations[j].newPicByte;
            }
            if (this.listHistorics[i].listAlterations[j].oldPicByte != null) {
              this.listHistorics[i].listAlterations[j].oldPicByte = 'data:image/jpeg;base64,' + this.listHistorics[i].listAlterations[j].oldPicByte;
            }
          }
        }
      }, error => console.log(error));
  }

  go_back() {
    this.router.navigate(['/show-turbines', { id: this.report.projectoId, turbine: this.report.turbinaId }]);
  }

}
