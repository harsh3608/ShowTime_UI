import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeGuard } from './shared/authorization/guards/employee.guard';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { LeaveManagerComponent } from './leaves/leave-manager/leave-manager.component';
import { CommonGuard } from './shared/authorization/guards/common.guard';

const routes: Routes = [{
  path:'home',
  component: EmployeeDashboardComponent,
  canActivate: [EmployeeGuard]
},
{
  path:'working-hours',
  component: WorkCalendarComponent,
  canActivate: [EmployeeGuard]
},
{
  path:'leave-manager',
  component: LeaveManagerComponent,
  canActivate: [CommonGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
