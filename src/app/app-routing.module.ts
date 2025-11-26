import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator/administrator.component';
import { HistoricComponent } from './administrator/historic/historic.component';
import { LoginComponent } from './login/login.component';
import { ShowTurbinesComponent } from './show-turbines/show-turbines.component';
import { TechnicianComponent } from './technician/technician/technician.component';
import { UpdateReportsComponent } from './technician/update-reports/update-reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'technician', component: TechnicianComponent },
  { path: 'update-report/:id', component: UpdateReportsComponent },
  { path: 'show-turbines/:id', component: ShowTurbinesComponent },
  { path: 'show-turbines', component: ShowTurbinesComponent },
  { path: 'historic/:id', component: HistoricComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
