import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductCategory } from '@core/domain-classes/product-category';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { CategoryService } from 'src/app/category/category.service';
import { v4 as Guid } from 'uuid';
import { SubCategoryService } from '../sub-category.service';

@Component({
  selector: 'app-manage-sub-category',
  templateUrl: './manage-sub-category.component.html',
  styleUrls: ['./manage-sub-category.component.scss'],
})
export class ManageSubCategoryComponent
  extends BaseComponent
  implements OnInit
{
  isEdit: boolean = false;
  subcategoryForm: FormGroup;
  categories: ProductCategory[];
  constructor(
    public dialogRef: MatDialogRef<ManageSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSubcategory,
    private productSubcategoryService: SubCategoryService,
    private productCategoryService: CategoryService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getCategory();
    if (this.data.subCategoryUUID) {
      this.data.isUpdate = true;
      this.subcategoryForm.patchValue(this.data);
      this.isEdit = true;
    }
  }

  createForm() {
    let uuid = Guid();
    this.subcategoryForm = this.fb.group({
      categoryUUID: ['', Validators.required],
      subCategoryUUID: [uuid],
      nameEnglish: ['', Validators.required],
      // nameSecondLanguage: ['', Validators.required],
      descriptionEnglish: [''],
      // descriptionSecondLanguage: [''],
      code: [''],
      branchUUID: [''],
      allowNonStock:[false],
      allowZeroPrice:[false],
      isActive: [true],
    });
  }

  get isActive():boolean {return this.subcategoryForm.get('isActive').value}
  get allowZeroPrice():boolean {return this.subcategoryForm.get('allowZeroPrice').value}
  get allowNonStock():boolean {return this.subcategoryForm.get('allowNonStock').value}
  getCategory() {
    this.productCategoryService.getActiveCategories()
      .subscribe((res: ProductCategory[]) => {
        this.categories = res;
      });
  }

  onCancel(isLoad: boolean): void {
    this.dialogRef.close(isLoad);
  }

  saveSubcategory(): void {
    if (!this.subcategoryForm.valid) {
      this.subcategoryForm.markAllAsTouched();
      return;
    }
    const subcategoryData: ProductSubcategory = this.subcategoryForm.getRawValue();
    // subcategoryData.categoryUUID = subcategoryData.productCategory?.categoryUUID
    subcategoryData.branchUUID = subcategoryData.branchUUID ||  environment.branchUUID;

    if (this.data.isUpdate) {
      this.productSubcategoryService.update(subcategoryData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.SUBCATEGORY_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close(true);
      });
    } else {
      this.productSubcategoryService.add(subcategoryData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.SUBCATEGORY_ADDED_SUCCESSFULLY'));
        this.dialogRef.close(true);
      });
    }
  }

  changeStockValue(categoryId:string){
    const category = this.categories.find(x=>x.categoryUUID == categoryId)
    if(!category)return;

    this.subcategoryForm.patchValue({
      allowNonStock:category.allowNonStock,
      allowZeroPrice:category.allowZeroPrice,
    })
  }
}
