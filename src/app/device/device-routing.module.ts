import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceConfigurationComponent } from './device-configuration/device-configuration.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceUserListComponent } from './device-user/device-user-list/device-user-list.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { ManageDeviceUserComponent } from './device-user/manage-device-user/manage-device-user.component';
import { DeviceUserResolverService } from './device-user/manage-device-user/device-user.resolver';
import { DeviceDetailResolver } from './sync/device-detail.resolver';
import { DeviceConfigurationResolver } from './device-configuration/device-configuration.resolver';
import { SyncComponent } from './sync/sync.component';
import { DeviceUserConfigurationComponent } from './device-user/device-user-configuration/device-user-configuration.component';
import { UserDetailResolverService } from '../user/user-detail.resolver';
import { DeviceUserPermissionPresentationComponent } from './device-user/device-user-permission-presentation/device-user-permission-presentation.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent,
    data: { claimType: 'device_device_list_device' },
    canActivate: [AuthGuard],
  },
  {
    path: 'config/:id',
    component: DeviceConfigurationComponent,
    resolve: { deviceConfig: DeviceConfigurationResolver },
    data: { claimType: 'device_device_device_configuration' },
    canActivate: [AuthGuard],
  },
  {
    path: 'sync/:id',
    component: SyncComponent,
    resolve: { device: DeviceDetailResolver },
    data: { claimType: ['device_device_view_sync_sessions','device_device_view_sync_logs'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: DeviceUserComponent,
    children: [
      {
        path: ':id',
        component: DeviceUserListComponent,
        resolve: { device: DeviceDetailResolver },
        data: { claimType: 'device_device_list_device_user' },
        canActivate: [AuthGuard],
      },
      {
        path: 'manage/:id',
        component: ManageDeviceUserComponent,
        resolve: { deviceUser: DeviceUserResolverService },
        data: { claimType: ['device_device_add_device_user','device_device_edit_device_user'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'configuration/:id',
        component: DeviceUserConfigurationComponent,
        resolve: { deviceUserConfig: DeviceUserResolverService },
        data: { claimType: 'device_device_device_user_configuration' },
        canActivate: [AuthGuard],
      },
      {
        path: 'permission/:id',
        component: DeviceUserPermissionPresentationComponent,
        resolve: { user: UserDetailResolverService },
        data: { claimType: 'device_device_device_user_permissions' },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
