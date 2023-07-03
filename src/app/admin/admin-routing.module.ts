import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from '../employee/shared/authorization/guards/admin.guard';

const routes: Routes = [{
  path:'home',
  component:AdminDashboardComponent,
  canActivate: [AdminGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
