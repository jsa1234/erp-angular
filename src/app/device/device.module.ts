import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDeviceComponent } from './manage-device/manage-device.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { DeviceConfigurationComponent } from './device-configuration/device-configuration.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SyncComponent } from './sync/sync.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SyncLogsComponent } from './sync/sync-logs/sync-logs.component';
import { SyncSessionsComponent } from './sync/sync-sessions/sync-sessions.component';
import { DeviceDetailResolver } from './sync/device-detail.resolver';
import { LostDeviceComponent } from './lost-device/lost-device.component';
import { DeviceConfigurationResolver } from './device-configuration/device-configuration.resolver';

import { DeviceUserComponent } from './device-user/device-user.component';
import { DeviceUserListComponent } from './device-user/device-user-list/device-user-list.component';
import { ManageDeviceUserComponent } from './device-user/manage-device-user/manage-device-user.component';
import { MatCardModule } from '@angular/material/card';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DeviceUserResolverService } from './device-user/manage-device-user/device-user.resolver';
import { ResetPinComponent } from './device-user/reset-pin/reset-pin.component';
import { DeviceUserConfigurationComponent } from './device-user/device-user-configuration/device-user-configuration.component';
import { DeviceUserPermissionPresentationComponent } from './device-user/device-user-permission-presentation/device-user-permission-presentation.component';
import { UserModule } from '../user/user.module';
import { UserDetailResolverService } from '../user/user-detail.resolver';
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    DeviceListComponent,
    ManageDeviceComponent,
    DeviceConfigurationComponent,
    SyncComponent,
    SyncLogsComponent,
    SyncSessionsComponent,
    LostDeviceComponent,
    DeviceUserComponent,
    DeviceUserListComponent,
    ManageDeviceUserComponent,
    ResetPinComponent,
    DeviceUserConfigurationComponent,
    DeviceUserPermissionPresentationComponent,
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    UserModule
  ],
  providers:[
    DeviceDetailResolver,
    DeviceConfigurationResolver,
    DeviceUserResolverService,
    UserDetailResolverService
  ]
})
export class DeviceModule { }
