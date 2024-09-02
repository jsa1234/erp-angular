import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { SubCategoryService } from '../sub-category.service';
import { SubCategoryListPresentationComponent } from '../sub-category-list-presentation/sub-category-list-presentation.component';
import { TranslationService } from '@core/services/translation.service';
@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent extends BaseComponent implements OnInit {
  @ViewChild(SubCategoryListPresentationComponent) subCategoryListPresentationComponent: SubCategoryListPresentationComponent;
  constructor(
    private productSubcategoryService:SubCategoryService,
    private toasterService:ToastrService,
    private translationService:TranslationService)  {
    super()
    }

  ngOnInit(): void {
  }
  deleteSubcategory(id: string): void {
    this.sub$.sink = this.productSubcategoryService.delete(id).subscribe(() => {
      this.subCategoryListPresentationComponent.loadData()
      this.toasterService.success(this.translationService.getValue('RESPONSE_MESSAGE.SUBCATEGORY_DELETED_SUCCESSFULLY'));
    });
  }


}
