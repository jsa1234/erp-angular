import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '@core/domain-classes/country';
import { ToastrService } from 'ngx-toastr';
import { v4 as Guid } from 'uuid';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-manage-country',
  templateUrl: './manage-country.component.html',
  styleUrls: ['./manage-country.component.scss'],
})
export class ManageCountryComponent implements OnInit {
  countryForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ManageCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country,
    private fb: FormBuilder,
    private countryService: CountryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.data.countryUUID) {
      this.data.isUpdate = true;
      
      // this.title = this.translationService.getValue('UNIT.EDIT_UNIT')
      this.countryForm.patchValue(this.data);
      this.isEdit = true;
    }
  }
  createForm() {
    let uuid = Guid();
    this.countryForm = this.fb.group({
      countryUUID: [uuid],
      countryCode: ['', Validators.required],
      nameEnglish: ['', Validators.required],
      nameSecondLanguage: [''],
      isActive:[true]
    });
  }
  get isActive():boolean {return this.countryForm.get('isActive').value}
  saveCountry(): void {
    if (!this.countryForm.valid) {
      this.countryForm.markAllAsTouched();
      return;
    }
    const countryData: Country = this.countryForm.value;

    if (this.data?.isUpdate) {
      this.countryService.update(countryData).subscribe(() => {
        this.toastrService.success('Country Updated Successfully');
        this.onCloseDialog(true)
      });
    } else {
      this.countryService.add(countryData).subscribe(() => {
        this.toastrService.success('Country Created Successfully');
        this.onCloseDialog(true)
      });
    }
  }
  onCloseDialog(isLoad:boolean):void {
    this.dialogRef.close(isLoad);
  }
}
