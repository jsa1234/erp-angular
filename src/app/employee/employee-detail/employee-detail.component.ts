import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '@core/domain-classes/country';
import { District } from '@core/domain-classes/district';
import { Employee } from '@core/domain-classes/employee';
import { State } from '@core/domain-classes/state';
import { TranslationService } from '@core/services/translation.service';
import { QueryParams } from '@ngrx/data';
import { EditorConfig } from '@shared/editor.config';
import { v4 as Guid } from 'uuid';

import { BaseComponent } from 'src/app/base.component';
import { EmployeeService } from '../employee.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DebitCredit } from '@core/domain-classes/enums/debit-credit-enum';
import { StateService } from 'src/app/locations/state/state.service';
import { DistrictService } from 'src/app/locations/district/district.service';
import { CountryService } from 'src/app/locations/country/country.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent extends BaseComponent implements OnInit {
  countries: Country[] = []
  state: string = "";
  country: string = "";
  district: string = "";
  states: State[] = []
  districts: District[] = []
  cities = [{ id: 1, countryName: 'India' }]
  imgSrc: any = null;
  employeeForm: FormGroup;
  isImageUpdate: boolean = false;
  employee: Employee;
  titlePageLstring = "Add employee";
  ditorConfig = EditorConfig;
  isLoading = false;
  employeeUploadImage: any = null;
  isUpdate: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private stateService: StateService,
    private districtService: DistrictService,
    private toastrService: ToastrService,
    private countryService: CountryService) { super(); }

  ngOnInit(): void {
    let branchData = JSON.parse(localStorage.getItem('branch') || '{}');
    let branchUUID = branchData.branchUUID;
    this.getCountries();
    this.createEmployeeForm();

    this.sub$.sink = this.route.data.subscribe(
      (data: { employee: Employee }) => {
        if (data.employee) {
          this.isUpdate = true;
          this.employee = { ...data.employee };
          this.titlePageLstring = 'Update Employee';
          this.patchEmployee();
          if (this.employee.imagePath) {
            this.imgSrc = `${environment.apiUrl}/EmployeeImages/${this.employee.imagePath}`;
          }
        } else {
          this.isUpdate = false;
          this.titlePageLstring = 'Add Employee';
          if (this.employee) {
            this.imgSrc = '';
            this.createEmployeeForm();
          }
        }
      }
    );
    //this.sub$.add(routeSub$);


  }
  createEmployeeForm() {
    let employeeUUID = Guid();
    this.employeeForm = this.fb.group({
      employeeUUID: [employeeUUID],
      nameEnglish: [''],
      nameSecondLanguage: [''],
      namePrefixEnglish: [''],
      firstNameEnglish: ['',Validators.required],
      middleNameEnglish: [''],
      lastNameEnglish: ['',Validators.required],
      nameSuffixEnglish: [''],
      namePrefixArabic: [''],
      firstNameArabic: [''],
      middleNameArabic: [''],
      lastNameArabic: [''],
      nameSuffixArabic: [''],
      mobileCountryCode: [''],
      mobile: [''],
      phoneCountryCode: [''],
      phone: [''],
      email: [''],
      website: [''],
      fax: [''],
      birthdate: [''],
      gender: 0,
      imagePath: [''],
      buildingNoEnglish: [''],
      buildingNoArabic: [''],
      streetEnglish: [''],
      streetArabic: [''],
      placeEnglish: [''],
      placeArabic: [''],
      district: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      createdBy: [''],
      openingBalance: [0],
      creditLimit: [0],
      debitCredit: ['0'],
      maxCreditDays: [0],
      traySecurityRequired: [false],
      isActive: [true],
      accountCode:['',Validators.required]

    })
  }
  onEmployeeSubmit() {
    if (this.employeeForm.valid) {
      const empObj = this.createBuildForm();
      empObj.countryObj = empObj.country ? this.countries.filter(x => x.countryUUID == empObj.country)[0] : null;
      empObj.stateObj = empObj.state ? this.states.filter(x => x.stateUUID == empObj.state)[0] : null;
      empObj.districtObj = empObj.district ? this.districts.filter(x => x.districtUUID == empObj.district)[0] : null;
      if (this.isImageUpdate) {
        empObj.imageFile = this.imgSrc ? this.imgSrc : '';
        empObj.isImageUpdate = true;
      }

      if (this.isUpdate) {
        this.isLoading = true;
        this.sub$.sink = this.employeeService
          .updateEmployee(this.employee.accountUUID, empObj)
          .subscribe((c) => {
            this.isLoading = false;
            this.toastrService.success('Employee Updated Successfully');
            this.router.navigate(['/employee']);
          }, () => this.isLoading = false);
      }
      else {
        this.isLoading = true;
        this.sub$.sink = this.employeeService
          .saveEmployee(empObj)
          .subscribe((c) => {
            this.isLoading = false;
            this.toastrService.success('Employee Created Successfully');

            this.router.navigate(['/employee']);
          }, () => this.isLoading = false);
      }
    }
    else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getCountries() {
    this.countryService.getActiveCountries().subscribe((res: Country[]) => {
      this.countries = res;
    })
  }

  getStateByCountry(countryUUID: string) {
    this.stateService.getStateByCountry(countryUUID,true).subscribe((res: State[]) => {
      this.states = res;
    })
  }
  getStateByCountryModel() {
    let id: string = this.employeeForm.controls["country"].value;
    let params: QueryParams = { isActive: "1", countryUUID: id };
    this.employeeForm.controls["state"].setValue("");
    this.employeeForm.controls["district"].setValue("");
    this.states=[];
    this.districts=[]
    this.stateService.getStateByCountry(id,true).subscribe((res: State[]) => {
      this.states = res;
    })
  }
  getDistrictByState(stateUUID: string) {
    this.districtService.getDistrictByState(stateUUID,true).subscribe((res: District[]) => {
      this.districts = res;
    })
  }
  getDistrictByStateModel() {
    let id: string = this.employeeForm.controls["state"].value;
    let params: QueryParams = { isActive: "1", stateUUID: id };
    this.employeeForm.controls["district"].setValue("");
    this.districts=[]
    this.districtService.getDistrictByState(id,true).subscribe((res: District[]) => {
      this.districts = res;
    })
  }

  createBuildForm(): Employee {
    const branchData = JSON.parse(localStorage.getItem('branch') || '{}');
    const branchUUID = branchData.branchUUID;
    const employeeObj: Employee = {
      accountUUID: this.employeeForm.get("employeeUUID").value,
      nameEnglish: this.employeeForm.get("nameEnglish").value,
      nameSecondLanguage: this.employeeForm.get("nameSecondLanguage").value,
      namePrefixEnglish: this.employeeForm.get("namePrefixEnglish").value,
      firstNameEnglish: this.employeeForm.get("firstNameEnglish").value,
      middleNameEnglish: this.employeeForm.get("middleNameEnglish").value,
      lastNameEnglish: this.employeeForm.get("lastNameEnglish").value,
      nameSuffixEnglish: this.employeeForm.get("nameSuffixEnglish").value,
      namePrefixArabic: this.employeeForm.get("namePrefixArabic").value,
      firstNameArabic: this.employeeForm.get("firstNameArabic").value,
      middleNameArabic: this.employeeForm.get("middleNameArabic").value,
      lastNameArabic: this.employeeForm.get("lastNameArabic").value,
      nameSuffixArabic: this.employeeForm.get("nameSuffixArabic").value,
      mobileCountryCode: this.employeeForm.get("mobileCountryCode").value,
      mobile: this.employeeForm.get("mobile").value,
      phoneCountryCode: this.employeeForm.get("phoneCountryCode").value,
      phone: this.employeeForm.get("phone").value,
      email: this.employeeForm.get("email").value,
      website: this.employeeForm.get("website").value,
      fax: this.employeeForm.get("fax").value,
      //birthdate: this.employeeForm.get("birthdate").value,
      gender: this.employeeForm.get("gender").value,
      imagePath: this.employeeForm.get("imagePath").value,
      buildingNoEnglish: this.employeeForm.get("buildingNoEnglish").value,
      buildingNoArabic: this.employeeForm.get("buildingNoArabic").value,
      streetEnglish: this.employeeForm.get("streetEnglish").value,
      streetArabic: this.employeeForm.get("streetArabic").value,
      placeEnglish: this.employeeForm.get("placeEnglish").value,
      placeArabic: this.employeeForm.get("placeArabic").value,
      country: this.employeeForm.get("country").value,
      state: this.employeeForm.get("state").value,
      district: this.employeeForm.get("district").value,
      zipCode: this.employeeForm.get("zipCode").value,
      createdBy: this.employeeForm.get("createdBy").value,
      openingBalance: this.employeeForm.get("openingBalance").value,
      creditLimit: this.employeeForm.get("creditLimit").value,
      accountCode: this.employeeForm.get("accountCode").value,
      debitCredit: this.employeeForm.get("debitCredit").value,
      maxCreditDays: this.employeeForm.get("maxCreditDays").value,
      traySecurityRequired: this.employeeForm.get("traySecurityRequired").value,
      isActive: this.employeeForm.get("isActive").value,
      branchUUID: branchUUID,
      //imageFile: this.employeeUploadImage?.src,
    }

    return employeeObj;
  }


  onlyNumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onRemoveImage() {
    this.isImageUpdate = true;
    this.imgSrc = '';
  }
  onFileSelect($event) {
    const fileSelected = $event.target.files[0];
    if (!fileSelected) {
      return;
    }
    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.isImageUpdate = true;
      this.employeeUploadImage = Object.assign(
        {},
        {
          src: reader.result,
          uid: fileSelected.uid,
        }
      );
      $event.target.value = '';
    };
  }

  patchEmployee() {
    const branchData = JSON.parse(localStorage.getItem('branch') || '{}');
    const branchUUID = branchData.branchUUID;
    let countryObj: Country = this.employee.countryObj;
    //this.country = countryObj?.countryUUID
    countryObj && this.getStateByCountry(countryObj.countryUUID);
    let stateObj: State = this.employee.stateObj;
   // this.state = stateObj?.stateUUID
    stateObj && this.getDistrictByState(stateObj.stateUUID);
    let districtObj: District = this.employee.districtObj;
   // this.district = districtObj?.districtUUID
    this.employeeForm.patchValue({
      country: countryObj?.countryUUID,
      state:stateObj?.stateUUID,
      district:districtObj?.districtUUID,
      firstNameEnglish: this.employee.firstNameEnglish,
      accountUUID: this.employee.accountUUID,
      nameEnglish: this.employee.nameEnglish,
      nameSecondLanguage: this.employee.nameSecondLanguage,
      namePrefixEnglish: this.employee.namePrefixEnglish,
      middleNameEnglish: this.employee.middleNameEnglish,
      lastNameEnglish: this.employee.lastNameEnglish,
      nameSuffixEnglish: this.employee.nameSuffixEnglish,
      namePrefixArabic: this.employee.namePrefixArabic,
      firstNameArabic: this.employee.firstNameArabic,
      middleNameArabic: this.employee.middleNameArabic,
      lastNameArabic: this.employee.lastNameArabic,
      nameSuffixArabic: this.employee.nameSuffixArabic,
      mobileCountryCode: this.employee.mobileCountryCode,
      mobile: this.employee.mobile,
      phoneCountryCode: this.employee.phoneCountryCode,
      phone: this.employee.phone,
      email: this.employee.email,
      website: this.employee.website,
      fax: this.employee.fax,
      //birthdate: this.employee.birthdate,
      gender: this.employee.gender,
      imagePath: this.employee.imagePath,
      buildingNoEnglish: this.employee.buildingNoEnglish,
      buildingNoArabic: this.employee.buildingNoArabic,
      streetEnglish: this.employee.streetEnglish,
      streetArabic: this.employee.streetArabic,
      placeEnglish: this.employee.placeEnglish,
      placeArabic: this.employee.placeArabic,
      zipCode: this.employee.zipCode,
      createdBy: this.employee.createdBy,
      openingBalance: this.employee.openingBalance,
      creditLimit: this.employee.creditLimit,
      debitCredit: this.employee.debitCredit.toString(),
      maxCreditDays: this.employee.maxCreditDays,
      traySecurityRequired: this.employee.traySecurityRequired,
      isActive: this.employee.isActive,
      branchUUID: branchUUID,
      accountCode:this.employee.accountCode
    });
    // this.employeeForm.get('accountCode').disable()
  }

  onBackPress(){
    this.router.navigate(["/employee"])
  }
}
