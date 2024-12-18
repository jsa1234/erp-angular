import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPermissionPresentationComponent } from './user-permission-presentation/user-permission-presentation.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { UserDetailResolverService } from './user-detail.resolver';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { UserConfigurationResolver } from './user-configuration/user-configuration.resolver';


@NgModule({
  declarations: [
    UserListComponent,
    ManageUserComponent,
    UserPermissionComponent,
    UserPermissionPresentationComponent,
    ResetPasswordComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    UserConfigurationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [
    UserDetailResolverService,
    UserConfigurationResolver
  ],
  exports:[
    UserPermissionPresentationComponent
  ]
})
export class UserModule { }
