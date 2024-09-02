import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeDetailResolverServices } from './employee-detail/employee-detail.resolver';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { claimType: 'account_employee_list_employee' },
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: EmployeeDetailComponent,
     resolve: {
       employee: EmployeeDetailResolverServices
     },
    data: { claimType: ['account_employee_create_employee', 'account_employee_edit_employee'] },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
