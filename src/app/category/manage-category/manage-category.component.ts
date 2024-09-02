import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from '@core/domain-classes/product-category';
import { ProductCategoryService } from '@core/services/product-category.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { v4 as Guid } from 'uuid';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent extends BaseComponent implements OnInit {
  isEdit:boolean = false
  categoryForm:FormGroup

  constructor(
    public dialogRef:MatDialogRef<ManageCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductCategory,
    private productCategoryService:ProductCategoryService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService

  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.categoryUUID) {
      this.data.isUpdate = true
      this.categoryForm.patchValue(this.data);
      this.isEdit = true;
    }

  }


  createForm() {
    let uuid = Guid()
    this.categoryForm = this.fb.group({
      categoryUUID: [uuid],
      nameEnglish :['', Validators.required],
      // nameSecondLanguage :['', Validators.required],
      descriptionEnglish :[''],
      // descriptionSecondLanguage :[''],
      code :[''],
      branchUUID:[environment.branchUUID],
      allowNonStock:[false],
      allowZeroPrice:[false],
      isActive:[true]


    });
  }
  get isActive():boolean {return this.categoryForm.get('isActive').value}
  get allowNonStock():boolean {return this.categoryForm.get('allowNonStock').value}
  get allowZeroPrice():boolean {return this.categoryForm.get('allowZeroPrice').value}
  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }

  saveCategory(): void {
    if (!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const categoryData: ProductCategory = this.categoryForm.getRawValue();
    categoryData.branchUUID = categoryData.branchUUID || environment.branchUUID
    
    if (this.data.isUpdate) {
      this.productCategoryService.update(categoryData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.CATEGORY_UPDATED_SUCCESSFULLY'));
        this.onCancel(true)
      });
    } else {
      this.productCategoryService.add(categoryData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.CATEGORY_ADDED_SUCCESSFULLY'));
        this.onCancel(true)
      });
    }
  }



}
