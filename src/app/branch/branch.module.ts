import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchListComponent } from './branch-list/branch-list.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ManageBranchComponent } from './manage-branch/manage-branch.component';
import { BranchResolver } from './branch.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BranchConfigurationComponent } from './branch-configuration/branch-configuration.component';
import { BranchConfigurationResolver } from './branch-configuration/branch-configuration.resolver';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';


@NgModule({
  declarations: [
    BranchListComponent,
    ManageBranchComponent,
    BranchConfigurationComponent,
    BranchDetailComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers:[
    BranchResolver,
    BranchConfigurationResolver  ]
})
export class BranchModule { }
