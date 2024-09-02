import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './branch-list/branch-list.component';
import { ManageBranchComponent } from './manage-branch/manage-branch.component';
import { BranchResolver } from './branch.resolver';
import { BranchConfigurationResolver } from './branch-configuration/branch-configuration.resolver';
import { BranchConfigurationComponent } from './branch-configuration/branch-configuration.component';
import { AuthGuard } from '@core/security/auth.guard';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BranchListComponent,
    data: { claimType: 'branch_branch_list_branch' },
    canActivate: [AuthGuard],
  },
  {
    path: 'manage/:id',
    component: ManageBranchComponent,
    data: { claimType: ['branch_branch_create_branch','branch_branch_edit_branch'] },
    canActivate: [AuthGuard],
    resolve: { branchData: BranchResolver }
  },
  {
    path: 'detail/:id',
    component: BranchDetailComponent,
    data: { claimType: 'branch_branch_view_branch' },
    canActivate: [AuthGuard],
    resolve: { branchData: BranchResolver }
  },
  {
    path: 'configurations/:id',
    component: BranchConfigurationComponent,
    data: { claimType: 'branch_branch_view_branch_configurations' },
    canActivate: [AuthGuard],
    resolve: { branchConfig: BranchConfigurationResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
