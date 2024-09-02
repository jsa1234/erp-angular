import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { District } from '@core/domain-classes/district';
import { QueryParams } from '@ngrx/data';
import { Country } from '@core/domain-classes/country';
import { v4 as Guid } from 'uuid';
import { State } from '@core/domain-classes/state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { StateService } from '../../state/state.service';
import { CountryService } from '../../country/country.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-manage-district',
  templateUrl: './manage-district.component.html',
  styleUrls: ['./manage-district.component.scss'],
})
export class ManageDistrictComponent implements OnInit {
  isEdit: boolean = false;
  districtForm: FormGroup;
  country: Country[];
  state: State[];

  constructor(
    public dialogRef: MatDialogRef<ManageDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) public data: District,
    private stateService: StateService,
    private countryService: CountryService,
    private districtService: DistrictService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getCountry();
    if (this.data.districtUUID) {
      this.data.isUpdate = true;
      this.patchDistrict();
      this.isEdit = true;
    }
  }
  patchDistrict(){
   this.getState(this.data.states.countryUUID)
    this.districtForm.patchValue({
      districtUUID: this.data.districtUUID,
      countryUUID: this.data.states.countryUUID,
      stateUUID:this.data.states.stateUUID,
      nameEnglish:this.data.nameEnglish ,
      nameSecondLanguage: this.data.nameSecondLanguage,
      isActive:this.data.isActive
    })
  }
  createForm() {
    let uuid = Guid();
    this.districtForm = this.fb.group({
      districtUUID: [uuid],
      countryUUID: [''],
      stateUUID: [''],
      nameEnglish: ['', Validators.required],
      // nameSecondLanguage: ['', Validators.required],
      isActive:[true]
    });
  }
  get isActive():boolean {return this.districtForm.get('isActive').value}
  getCountry() {
    this.countryService.getActiveCountries().subscribe((res: Country[]) => {
      this.country = res;
    });
  }
  getState(countryUUID:string) {
    this.stateService.getStateByCountry(countryUUID,true).subscribe((res: State[]) => {
      this.state = res;
    });
  }

  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }


  saveDistrict(): void {
    if (this.districtForm.invalid) {
      this.districtForm.markAllAsTouched();
      return;
    }
    const districtData: District = this.districtForm.value;
    
    if (this.data?.isUpdate) {
      // districtData.brandUUID = this.data.brandUUID
      this.districtService.update(districtData).subscribe(() => {
        this.toastrService.success('District Updated Successfully');
        this.onCancel(true)
      });
    } else {
      this.districtService.add(districtData).subscribe(() => {
        this.toastrService.success('District Added Successfully');
        this.onCancel(true)
      });
    }
  }
}
