import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailResolverService } from './user-detail.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { UserConfigurationResolver } from './user-configuration/user-configuration.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { claimType: 'profile_user_list_user' },
    canActivate: [AuthGuard]
  }, {
    path: 'manage/:id',
    component: ManageUserComponent,
    resolve: { user: UserDetailResolverService },
    data: { claimType: 'profile_user_edit_user' },
    canActivate: [AuthGuard]
  }, {
    path: 'manage',
    component: ManageUserComponent,
    data: { claimType: 'profile_user_create_user' },
    canActivate: [AuthGuard]
  }, {
    path: 'permission/:id',
    component: UserPermissionComponent,
    resolve: { user: UserDetailResolverService },
    data: { claimType: 'profile_user_user_permission' },
    canActivate: [AuthGuard]
  }, {
    path: 'configuration/:id',
    component: UserConfigurationComponent,
    resolve: { user: UserConfigurationResolver },
    // data: { claimType: 'profile_user_user_permission' },
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
