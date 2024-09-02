import { Component, OnInit,Inject } from '@angular/core';
import { State } from '@core/domain-classes/state';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { BaseComponent } from 'src/app/base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { QueryParams } from '@ngrx/data';
import { Country } from '@core/domain-classes/country';
import { v4 as Guid } from 'uuid';
import { StateService } from '../state.service';
import { CountryService } from '../../country/country.service';
@Component({
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrls: ['./manage-state.component.scss']
})
export class ManageStateComponent extends BaseComponent implements OnInit {
  isEdit:boolean = false
  stateForm:FormGroup
  country: Country[];

  constructor(
    public dialogRef:MatDialogRef<ManageStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:State,
    private stateService:StateService,
    private countryService:CountryService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    public translationService: TranslationService
  ) { 
    super()
  }

  ngOnInit(): void {
    this.createForm();
    this.getCountry()
    if (this.data.stateUUID) {
      this.data.isUpdate = true;
      this.stateForm.patchValue(this.data);
      this.isEdit = true;
    }

  }
  createForm() {
    let uuid = Guid();
    this.stateForm = this.fb.group({
      countryUUID: [''],
      stateUUID:[uuid],
      nameEnglish :['', Validators.required],
      // nameSecondLanguage :['', Validators.required],
      isActive:[true]
    });
  }
  get isActive():boolean {return this.stateForm.get('isActive').value}
  getCountry() {
    this.countryService.getActiveCountries().subscribe((res: Country[]) => {
      this.country = res;
    });
  }
  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }

  saveState(): void {
    if (!this.stateForm.valid) {
      this.stateForm.markAllAsTouched();
      return;
    }
    const stateData: State = this.stateForm.value;
    
    if (this.data?.isUpdate) {
      // stateData.brandUUID = this.data.brandUUID
      this.stateService.update(stateData).subscribe(() => {
        this.toastrService.success('State Updated Successfully');
        this.onCancel(true)
      });
    } else {
      this.stateService.add(stateData).subscribe(() => {
        this.toastrService.success('State Added Successfully');
        this.onCancel(true)
      });
    }
  }



}
