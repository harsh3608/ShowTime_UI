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
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveAddDialogComponent } from './leaves/leave-add-dialog/leave-add-dialog.component';
import { LeaveManagerComponent } from './leaves/leave-manager/leave-manager.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from "primeng/button";
import { DisableWeekendsDirective } from './shared/directives/disable-weekends.directive';
import { SelfLeaveCalendarComponent } from './leaves/self-leave-calendar/self-leave-calendar.component';
import { LeaveDetailsComponent } from './leaves/leave-details/leave-details.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeMenuComponent,
    EmployeeDashboardComponent,
    ChangePasswordComponent,
    WorkCalendarComponent,
    LeaveAddDialogComponent,
    LeaveManagerComponent,
    DisableWeekendsDirective,
    SelfLeaveCalendarComponent,
    LeaveDetailsComponent
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
    FullCalendarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    TableModule,
    PaginatorModule,
    InputSwitchModule,
    ButtonModule,

    
  ],
  exports:[DisableWeekendsDirective]
})
export class EmployeeModule { }
