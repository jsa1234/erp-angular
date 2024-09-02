import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@core/domain-classes/city';
import { Country } from '@core/domain-classes/country';
import { Customer } from '@core/domain-classes/customer';
import { ICustomerAccount } from '@core/domain-classes/customer-account';
import { District } from '@core/domain-classes/district';
import { Employee } from '@core/domain-classes/employee';
import { State } from '@core/domain-classes/state';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { EmployeeService } from 'src/app/employee/employee.service';
import { CountryService } from 'src/app/locations/country/country.service';
import { DistrictService } from 'src/app/locations/district/district.service';
import { StateService } from 'src/app/locations/state/state.service';
import { v4 as Guid } from 'uuid';
import { CustomerService } from '../customer.service';
export class AlreadyExistValidator {
  static exist(flag: boolean): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (flag) {
        return { exist: true };
      }
      return null;
    };
  }
}

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent extends BaseComponent implements OnInit {

  customerForm: FormGroup;
  imgSrc: any = null;
  isImageUpload: boolean = false;
  customer: Customer;
  customerAccount :ICustomerAccount;
  countries: Country[] = [];
  states:State[] = [];
  districts:District[] = [];
  cities: City[] = [];
  employees :Employee[] =[];
  isLoadingCity: boolean = false;
  editorConfig = EditorConfig;
  public filterCityObservable$: Subject<string> = new Subject<string>();
  loading$: Observable<boolean> = of(false);

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private location: Location,
    private Country:CountryService,
    private State:StateService,
    private District:DistrictService,
    private EmployeeService:EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createCustomerForm();
    this.getCountry();
    this.getCityByName();
    this.getSalesMan();



  
    const routeSub$ = this.route.data.subscribe(
      (data: { customer: ICustomerAccount }) => {
        if (data.customer) {
          this.customerAccount = { ...data.customer };
          if (this.customerAccount.imagePath) {
            this.imgSrc = `${environment.apiUrl}${this.customerAccount.imagePath}`;
          }
          this.customerAccount.countryObject?this.onCountriesChange(this.customerAccount.countryObject?.countryUUID):'';
          this.customerAccount.stateObject?this.onStateChange(this.customerAccount.stateObject?.stateUUID):'';
          this.patchCustomer();
        } else {
          if (this.customerAccount) {
            this.imgSrc = '';
            this.customerAccount = null;
            this.createCustomerForm();
          }
        }
      }
    );
    this.sub$.add(routeSub$);
  }

  getCityByName() {
    this.isLoadingCity = true;
    this.sub$.sink = this.filterCityObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((c: string) => {
          var strArray = c.split(':');
          return this.commonService.getCityByName(strArray[0], strArray[1]);
        })
      )
      .subscribe(
        (c: City[]) => {
          this.cities = [...c];
          this.isLoadingCity = false;
        },
        (err) => (this.isLoadingCity = false)
      );
  }

  patchCustomer() {

  //   let countryObject: Country = this.customerAccount.countryObject
    
  //   countryObject && this.getStateByCountry(countryObject.countryUUID);
  //   let stateObject: State = this.customerAccount.stateObject;
  //  // this.state = stateObj?.stateUUID
  //   stateObject && this.getDistrictByState(stateObject.stateUUID);
  //   let districtObject: District = this.customerAccount.districtObject;
    this.customerForm.patchValue({
      // country: countryObject?.countryUUID,
      // state:stateObject?.stateUUID,
      // district:districtObject?.districtUUID,
    
      accountUUID: this.customerAccount.accountUUID,
      nameEnglish: this.customerAccount.nameEnglish,
      nameSecondLanguage: this.customerAccount.nameSecondLanguage,
      firstNameEnglish: this.customerAccount.firstNameEnglish,
      middleNameEnglish: this.customerAccount.middleNameEnglish,
      lastNameEnglish: this.customerAccount.lastNameEnglish,
      namePrefixEnglish: this.customerAccount.namePrefixEnglish,
      nameSuffixEnglish: this.customerAccount.nameSuffixEnglish,
      gstVatNo: this.customerAccount.gstVatNo,
      regCrNo: this.customerAccount.regCrNo,
      addRegNo: this.customerAccount.addRegNo,
      mobileCountryCode: this.customerAccount.mobileCountryCode,
      mobile: this.customerAccount.mobile,
      phoneCountryCode: this.customerAccount.phoneCountryCode,
      phone: this.customerAccount.phone,
      email: this.customerAccount.email,
      fax: this.customerAccount.fax,
      website: this.customerAccount.website,
      buildingNoEnglish: this.customerAccount.buildingNoEnglish,
      placeEnglish: this.customerAccount.placeEnglish,
      streetEnglish: this.customerAccount.streetEnglish,
      state: this.customerAccount.stateObject?.stateUUID,
      country:this.customerAccount.countryObject?.countryUUID ,
      district: this.customerAccount.districtObject?.districtUUID,
      zipCode: this.customerAccount.zipCode,
      openingBalance: this.customerAccount.openingBalance,
      creditLimit: this.customerAccount.creditLimit,
      debitCredit:this.customerAccount.debitCredit.toString(),
      maxCreditDays: this.customerAccount.maxCreditDays,
      salesManUUID: this.customerAccount.salesManUUID,
      traySecurityRequired: this.customerAccount.traySecurityRequired,
      isActive: this.customerAccount.isActive,
      imagePath: this.customerAccount.imagePath,
      branchUUID:this.customerAccount.branchUUID,
      accountCode:this.customerAccount.accountCode,
      clientImage:this.customerAccount.clientImage,

    });
  }

  createCustomerForm() {
    let uuid = Guid()
    this.customerForm = this.fb.group({
    nameEnglish: ['',[Validators.required]],
    namePrefixEnglish:[''],
    firstNameEnglish :['',[Validators.required]], 
    middleNameEnglish :[''],
    lastNameEnglish :['',[Validators.required]],
    nameSuffixEnglish :[''],
    accountCode:['',[Validators.required]],
    gstVatNo :[''],
    regCrNo :[''],
    addRegNo :[''],
    mobileCountryCode :[''],
    mobile :[''],
    phoneCountryCode :[''],
    phone :[''],
    email :[''],
    website :[''],
    fax :[''],
    imagePath :[''],
    supplierImage :[''],
    isImageUpload:[''],
    buildingNoEnglish :[''],
    streetEnglish :[''],
    placeEnglish :[''],
    district :[''],
    state :[''],
    country :[''],
    zipCode:[''],
    openingBalance :[0],
    creditLimit:[0],
    debitCredit :['0'],
    maxCreditDays:[0],
    salesManUUID:[''],
    traySecurityRequired:[''],
    isActive:    [0],
    accountUUID:[uuid]
    });
  }



  getStateByCountry(id: string) {
    this.State.getStateByCountry(id,true).subscribe((res: State[]) => {
      this.states = res;
    })
  }

  getDistrictByState(id: string) {
    this.District.getDistrictByState(id,true).subscribe((res: District[]) => {
      this.districts = res;
    })
  }
  onEmailChange(event: any) {
    const email = this.customerForm.get('email').value;
    if (!email) {
      return;
    }
    const id =
      this.customer && this.customer.id ? this.customer.id : Guid.create();
    this.sub$.sink = this.customerService
      .checkEmailOrPhoneExist('', email, id)
      .subscribe((c) => {
        const emailControl = this.customerForm.get('email');
        if (c) {
          emailControl.setValidators([
            Validators.required,
            AlreadyExistValidator.exist(true),
          ]);
        } else {
          emailControl.setValidators([Validators.required]);
        }
        emailControl.updateValueAndValidity();
      });
  }

  onMobileNoChange(event: any) {
    const mobileno = this.customerForm.get('mobileNo').value;
    if (!mobileno) {
      return;
    }
    const id =
      this.customer && this.customer.id ? this.customer.id : Guid.create();
    this.sub$.sink = this.customerService
      .checkEmailOrPhoneExist('', mobileno, id)
      .subscribe((c) => {
        const mobileNoControl = this.customerForm.get('mobileNo');
        if (c) {
          mobileNoControl.setValidators([
            Validators.required,
            AlreadyExistValidator.exist(true),
          ]);
        } else {
          mobileNoControl.setValidators([Validators.required]);
        }
        mobileNoControl.updateValueAndValidity();
      });
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
      this.isImageUpload = true;
      $event.target.value = '';
    }
  }

  onRemoveImage() {
    this.imgSrc = '';
    this.isImageUpload = true;
  }

  getCountry() {
    const CountrySub$ = this.Country.getActiveCountries().subscribe((data) => {
      this.countries = data;
    });
    this.sub$.add(CountrySub$);
  }

  getSalesMan() {
   
    const salesMan$ = this.EmployeeService.getSalesMan().subscribe((data:Employee[]) => {
      this.employees = data;
    });
    this.sub$.add(salesMan$);
  }
  onStateChange(stateUUID:string) {
    const states$ = this.District.getDistrictByState(stateUUID,true).subscribe((data:District[]) => {
      this.districts = data;
    });
    // this.sub$.add(CountrySub$);
  }
  onCountriesChange(countryUUID:string) {
    const states$ = this.State.getStateByCountry(countryUUID,true).subscribe((data:State[]) => {
      this.states = data;
      this.districts = [];
    });
  }
  handleFilterCity(cityName: string) {
    const country = this.customerForm.get('countryName').value;
    if (cityName && country) {
      const strCountryCity = country + ':' + cityName;
      this.filterCityObservable$.next(strCountryCity);
    }
  }

  onCountryChange(country: any) {
    this.customerForm.patchValue({
      cityName: '',
    });
    if (country.value) {
      const strCountry = country.value + ':' + '';
      this.filterCityObservable$.next(strCountry);
    } else {
      this.cities = [];
    }
  }

  onCustomerList() {
    this.location.back();
  }

  onCustomerSubmit() {
    // let a =this.customerForm.value
    // debugger
    if (this.customerForm.valid) {
      this.loading$ = of(true)
      const custObj = this.createBuildForm();
      custObj.clientImage = this.imgSrc;
      custObj.isImageUpload = this.isImageUpload;
      if (this.customerAccount) {
        this.sub$.sink = this.customerService
          .updateCustomer(this.customerAccount.accountUUID, custObj)
          .subscribe(c => {
            this.toastrService.success('Customer Updated Successfully');
            this.router.navigate(['/customer']);
      this.loading$ = of(false)

          },
          ()=>{
            this.toastrService.error('Customer Updated Failed')
      this.loading$ = of(false)

          });
      } else {
        this.sub$.sink = this.customerService
          .saveCustomer(custObj)
          .subscribe(c => {
            this.toastrService.success('Customer Created Successfully');
            this.router.navigate(['/customer']);
      this.loading$ = of(false)

          },
          ()=>{
            this.toastrService.error('Customer Created Failed')
      this.loading$ = of(false)


          });
      }
    } else {
      this.markFormGroupTouched(this.customerForm);
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

  createBuildForm(): ICustomerAccount {
    const customerObj: ICustomerAccount = {
      accountUUID: this.customerForm.get('accountUUID').value,
      nameEnglish: this.customerForm.get('nameEnglish').value,
      // nameSecondLanguage: this.customerForm.get('nameSecondLanguage').value,
      firstNameEnglish: this.customerForm.get('firstNameEnglish').value,
      // firstNameArabic: this.customerForm.get('firstNameArabic').value,
      middleNameEnglish: this.customerForm.get('middleNameEnglish').value,
      // middleNameArabic: this.customerForm.get('middleNameArabic').value,
      lastNameEnglish: this.customerForm.get('lastNameEnglish').value,
      // lastNameArabic: this.customerForm.get('lastNameArabic').value,
      namePrefixEnglish: this.customerForm.get('namePrefixEnglish').value,
      // namePrefixArabic: this.customerForm.get('namePrefixArabic').value,
      nameSuffixEnglish: this.customerForm.get('nameSuffixEnglish').value,
      // nameSuffixArabic: this.customerForm.get('nameSuffixArabic').value,
      gstVatNo: this.customerForm.get('gstVatNo').value,
      regCrNo: this.customerForm.get('regCrNo').value,
      addRegNo: this.customerForm.get('addRegNo').value,
      mobileCountryCode: this.customerForm.get('mobileCountryCode').value,
      mobile: this.customerForm.get('mobile').value,
      phoneCountryCode: this.customerForm.get('phoneCountryCode').value,
      phone: this.customerForm.get('phone').value,
      email: this.customerForm.get('email').value,
      fax: this.customerForm.get('fax').value,
      website: this.customerForm.get('website').value,
      buildingNoEnglish: this.customerForm.get('buildingNoEnglish').value,
      // buildingNoArabic: this.customerForm.get('buildingNoArabic').value,
      placeEnglish: this.customerForm.get('placeEnglish').value,
      // placeArabic: this.customerForm.get('placeArabic').value,
      streetEnglish: this.customerForm.get('streetEnglish').value,
      // streetArabic: this.customerForm.get('streetArabic').value,
      districtObject: this.districts.find(x=>x.districtUUID==this.customerForm.get('district').value),
      stateObject: this.states.find(x=>x.stateUUID==this.customerForm.get('state').value),
      countryObject:this.countries.find(x=>x.countryUUID==this.customerForm.get('country').value),
      zipCode: this.customerForm.get('zipCode').value,
      openingBalance: this.customerForm.get('openingBalance').value? this.customerForm.get('openingBalance').value:0,
      creditLimit: this.customerForm.get('creditLimit').value,
      debitCredit: this.customerForm.get('debitCredit').value,
      maxCreditDays: this.customerForm.get('maxCreditDays').value,
      salesManUUID: this.customerForm.get('salesManUUID').value,
      traySecurityRequired: true,
      isActive: this.customerForm.get('isActive').value,
      imagePath: '',
      branchUUID:environment.branchUUID,
      accountCode:this.customerForm.get('accountCode').value,
      clientImage:''
    };
    return customerObj;
  }

}