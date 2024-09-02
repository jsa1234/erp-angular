import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '@core/domain-classes/brand';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { v4 as Guid } from 'uuid';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.scss']
})
export class ManageBrandComponent extends BaseComponent implements OnInit {
  isEdit:boolean = false
  brandForm:FormGroup

  constructor(
    public dialogRef:MatDialogRef<ManageBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Brand,
    private brandService:BrandService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService
  ) { 
    super()
  }

  ngOnInit(): void {
    this.createForm();
    if (this.data.brandUUID) {
      this.data.isUpdate = true
      this.brandForm.patchValue(this.data);
      this.isEdit = true;
    }
  }

  createForm() {
    let uuid = Guid()
    this.brandForm = this.fb.group({
      brandUUID: [uuid],
      nameEnglish :['', Validators.required],
      descriptionEnglish :[''],
      code :[''],
      branchUUID:[''],
      isActive:[true]
    });
  }
  get isActive():boolean {return this.brandForm.get('isActive').value}
  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }

  saveUnit(): void {
    if (!this.brandForm.valid) {
      this.brandForm.markAllAsTouched();
      return;
    }
    const brandData: Brand = this.brandForm.getRawValue();
    brandData.branchUUID = brandData.branchUUID || environment.branchUUID
    
    if (this.data.isUpdate) {
      // brandData.branchUUID = environment.branchUUID
      this.brandService.update(brandData).subscribe(() => {
        this.toastrService.success('Brand Updated Successfully');
        this.onCancel(true)
      },
      ()=>{
        this.toastrService.error('Brand Updated Failed');
      });
    } else {
      this.brandService.add(brandData).subscribe(() => {
        this.toastrService.success('Brand Created Successfully');
        this.onCancel(true)
      },
      ()=>{
        this.toastrService.error('Brand Created Failed');
      });
    }
  }

}
