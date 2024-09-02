import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from '@core/domain-classes/unit';
import { TranslationService } from '@core/services/translation.service';
import { UnitService } from '../unit.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { v4 as Guid } from 'uuid';

@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-unit.component.html',
  styleUrls: ['./manage-unit.component.scss']
})
export class ManageUnitComponent extends BaseComponent implements OnInit {
  isEdit: boolean = false;
  unitForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ManageUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unit,
    private unitService: UnitService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService) {
    super();
  }
  ngOnInit(): void {
    this.createForm();
    if (this.data.unitUUID) {   
      this.data.isUpdate = true
      this.unitForm.patchValue(this.data);
      this.isEdit = true;
    }
  }

  get isActive():boolean {return this.unitForm.get('isActive').value}
  createForm() {
    let uuid =Guid()
    this.unitForm = this.fb.group({
      nameEnglish: ['', Validators.required],
      // nameSecondLanguage: ['', Validators.required],
      code:[''],
      unitUUID:[uuid],
      syncFlag:[''],
      unitId:[''],
      isActive:[true]
    });
  }

  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }

  saveUnit(): void {
    if (!this.unitForm.valid) {
      this.unitForm.markAllAsTouched();
      return;
    }
    const unitData: Unit = this.unitForm.getRawValue();

    if (this.data.isUpdate) {
      this.unitService.update(unitData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('UNIT_UPDATED_SUCCESSFULLY'));
        this.onCancel(true)
      });
    } else {
      this.unitService.add(unitData).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('UNIT_ADDED_SUCCESSFULLY'));
        this.onCancel(true)
      });
    }
  }

}
