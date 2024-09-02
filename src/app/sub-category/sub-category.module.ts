import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryListPresentationComponent } from './sub-category-list-presentation/sub-category-list-presentation.component';
import { ManageSubCategoryComponent } from './manage-sub-category/manage-sub-category.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    SubCategoryListComponent,
    SubCategoryListPresentationComponent,
    ManageSubCategoryComponent
  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubCategoryModule { }
