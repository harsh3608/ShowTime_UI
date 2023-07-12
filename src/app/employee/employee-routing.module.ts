import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeGuard } from './shared/authorization/guards/employee.guard';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';

const routes: Routes = [{
  path:'home',
  component: EmployeeDashboardComponent,
  canActivate: [EmployeeGuard]
},
{
  path:'working-hours',
  component: WorkCalendarComponent,
  canActivate: [EmployeeGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
