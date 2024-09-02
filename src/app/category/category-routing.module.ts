import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:CategoryListComponent,
    data: { claimType: 'product_category_list_category' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
