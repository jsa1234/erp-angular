import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory } from '@core/domain-classes/product-category';
import { ProductCategoryService } from '@core/services/product-category.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { CategoryListPresentationComponent } from '../category-list-presentation/category-list-presentation.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseComponent implements OnInit {
  @ViewChild(CategoryListPresentationComponent) categoryListPresentationComponent: CategoryListPresentationComponent;

  
  constructor(
    private productCategoryService:ProductCategoryService,
    private toasterService:ToastrService,
    private translationService:TranslationService
  ) {
    super();
  }


  ngOnInit(): void {}

  deleteCategory(id: string): void {
    this.sub$.sink = this.productCategoryService.delete(id).subscribe(() => {
      this.categoryListPresentationComponent.loadData()
      this.toasterService.success(this.translationService.getValue('RESPONSE_MESSAGE.CATEGORY_DELETED_SUCCESSFULLY'));
    });
  }


}
