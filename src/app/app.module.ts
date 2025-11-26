import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministratorComponent } from './administrator/administrator/administrator.component';
import { TechnicianComponent } from './technician/technician/technician.component';
import { UsersComponent } from './administrator/users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { InsertReportsComponent } from './technician/insert-reports/insert-reports.component';
import { DropdownProjectsComponent } from './dropdowns/dropdown-projects/dropdown-projects.component';
import { HttpInterceptorService } from './login/httpInterceptor.service';
import { DropdownUsersComponent } from './dropdowns/dropdown-users/dropdown-users.component';
import { DropdownTurbinesComponent } from './dropdowns/dropdown-turbines/dropdown-turbines.component';
import { ShowTurbinesComponent } from './show-turbines/show-turbines.component';
import { DropdownReportsComponent } from './dropdowns/dropdown-reports/dropdown-reports.component';
import { UpdateReportsComponent } from './technician/update-reports/update-reports.component';
import { HistoricComponent } from './administrator/historic/historic.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdministratorComponent,
    TechnicianComponent,
    UsersComponent,
    ProjectsComponent,
    InsertReportsComponent,
    DropdownProjectsComponent,
    DropdownUsersComponent,
    DropdownTurbinesComponent,
    ShowTurbinesComponent,
    DropdownReportsComponent,
    UpdateReportsComponent,
    HistoricComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
