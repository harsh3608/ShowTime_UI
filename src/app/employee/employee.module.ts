import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { EmployeeRoutingModule } from './employee-routing.module';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeMenuComponent } from './employee-menu/employee-menu.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Chart } from 'chart.js';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeMenuComponent,
    EmployeeDashboardComponent,
    ChangePasswordComponent,
    WorkCalendarComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
  ]
})
export class EmployeeModule { }
