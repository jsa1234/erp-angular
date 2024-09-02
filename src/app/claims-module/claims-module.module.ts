import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsModuleRoutingModule } from './claims-module-routing.module';
import { ManageModuleComponent } from './manage-module/manage-module.component';
import { ModuleListPresentatiomComponent } from './module-list-presentatiom/module-list-presentatiom.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ManageModuleComponent,
    ModuleListPresentatiomComponent,
    ModuleListComponent
  ],
  imports: [
    CommonModule,
    ClaimsModuleRoutingModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule
  ]
})
export class ClaimsModuleModule { }
