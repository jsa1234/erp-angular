import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListPresentationComponent } from './category-list-presentation/category-list-presentation.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ManageCategoryComponent,
    CategoryListComponent,
    CategoryListPresentationComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class CategoryModule { }
