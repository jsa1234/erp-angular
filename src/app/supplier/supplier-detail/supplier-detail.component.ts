import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@core/domain-classes/city';
import { Country } from '@core/domain-classes/country';
import { Supplier } from '@core/domain-classes/supplier';
import { SupplierEmail } from '@core/domain-classes/supplierEmail';
import { CommonService } from '@core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { SupplierService } from '../supplier.service';
// import { Guid } from 'guid-typescript';
import { Location } from '@angular/common';
import { District } from '@core/domain-classes/district';
import { Employee } from '@core/domain-classes/employee';
import { State } from '@core/domain-classes/state';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { EditorConfig } from '@shared/editor.config';
import { EmployeeListDataSource } from 'src/app/employee/employee-list/employee-list-datasource';
import { EmployeeService } from 'src/app/employee/employee.service';
import { CountryService } from 'src/app/locations/country/country.service';
import { DistrictService } from 'src/app/locations/district/district.service';
import { StateService } from 'src/app/locations/state/state.service';
import { v4 as Guid } from 'uuid';

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
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
})
export class SupplierDetailComponent extends BaseComponent implements OnInit {
  supplierForm: FormGroup;
  titlePage: string = 'Add Supplier';
  imgSrc: any = null;
  isImageUpload: boolean = false;
  supplier: Supplier;
  supplierAccount:ISupplierAccount;
  countries: Country[] = [];
  states:State[] = [];
  districts:District[] = [];
  cities: City[] = [];
  employees: Employee[] = [];
  isLoadingCity: boolean = false;
  editorConfig = EditorConfig;
  isLoading = false;
  dataSource: EmployeeListDataSource;

  public filterCityObservable$: Subject<string> = new Subject<string>();

  get supplierAddress(): FormArray {
    return <FormArray>this.supplierForm.get('supplierAddresses');
  }
  get supplierEmailsArray(): FormArray {
    return <FormArray>this.supplierForm.get('supplierEmails');
  }

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private location: Location,
    private countryService:CountryService,
    private stateService:StateService,
    private districtService:DistrictService,
    private employeeService:EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createSupplierForm();
    this.getCountry();
    this.getSalesMan();
    // this.getCityByName();
    const routeSub$ = this.route.data.subscribe(
      (data: { supplier: ISupplierAccount }) => {
        if (data.supplier) {
          this.supplierAccount = { ...data.supplier };
          this.titlePage = 'Update Supplier';
          this.onCoutryChange(this.supplierAccount.countryObject?.countryUUID);
          this.onStateChange(this.supplierAccount.stateObject?.stateUUID);
          this.patchSupplier();
          if (this.supplierAccount.imagePath) {
            this.imgSrc = `${environment.apiUrl}${this.supplierAccount.imagePath}`;
          }

          // this.pushValuesSupplierEmailArray();
        } else {
          this.titlePage = 'Add Supplier';
          if (this.supplierAccount) {
            this.imgSrc = '';
            this.supplierAccount = null;
            this.createSupplierForm();
          }
          // this.addSupplierAddress();
          // this.supplierEmailsArray.push(this.buildSupplierEmail());
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

  patchSupplier() {

    this.supplierForm.patchValue({
      nameEnglish: this.supplierAccount.nameEnglish,
      nameSecondLanguage: this.supplierAccount.nameSecondLanguage,
    namePrefixEnglish:this.supplierAccount.namePrefixEnglish,
    firstNameEnglish :this.supplierAccount.firstNameEnglish,
    middleNameEnglish :this.supplierAccount.middleNameEnglish,
    lastNameEnglish :this.supplierAccount.lastNameEnglish,
    nameSuffixEnglish :this.supplierAccount.nameSuffixEnglish,
    namePrefixArabic :this.supplierAccount.namePrefixArabic,
    firstNameArabic :this.supplierAccount.firstNameArabic,
    middleNameArabic :this.supplierAccount.middleNameArabic,
    lastNameArabic :this.supplierAccount.lastNameArabic,
    nameSuffixArabic :this.supplierAccount.nameSuffixArabic,
    gstVatNo :this.supplierAccount.gstVatNo,
    regCrNo :this.supplierAccount.regCrNo,
    addRegNo :this.supplierAccount.addRegNo,
    mobileCountryCode :this.supplierAccount.mobileCountryCode,
    mobile :this.supplierAccount.mobile,
    phoneCountryCode :this.supplierAccount.phoneCountryCode,
    phone :this.supplierAccount.phone,
    email :this.supplierAccount.email,
    website :this.supplierAccount.website,
    fax :this.supplierAccount.fax,
    imagePath :this.supplierAccount.imagePath,
    supplierImage :this.supplierAccount.supplierImage,
    isImageUpload:true,
    buildingNoEnglish :this.supplierAccount.buildingNoEnglish,
    buildingNoArabic :this.supplierAccount.buildingNoArabic,
    streetEnglish :this.supplierAccount.streetEnglish,
    streetArabic :this.supplierAccount.streetArabic,
    placeEnglish :this.supplierAccount.placeEnglish,
    placeArabic :this.supplierAccount.placeArabic,
    district :this.supplierAccount.districtObject?.districtUUID,
    state :this.supplierAccount.stateObject?.stateUUID,
    country :this.supplierAccount.countryObject?.countryUUID,
    zipCode:this.supplierAccount.zipCode,
    openingBalance :this.supplierAccount.openingBalance,
    creditLimit:this.supplierAccount.creditLimit,
    debitCredit :this.supplierAccount.debitCredit.toString(),
    maxCreditDays:this.supplierAccount.maxCreditDays,
    salesManUUID:this.supplierAccount.salesManUUID,
    traySecurityRequired:this.supplierAccount.traySecurityRequired,
    isActive:    this.supplierAccount.isActive,
    accountUUID:this.supplierAccount.accountUUID,
    accountCode:this.supplierAccount.accountCode,
    });
    // this.addSupplierAddress();
  }

  createSupplierForm() {
    let uuid = Guid()
    this.supplierForm = this.fb.group({
      nameEnglish: ['',Validators.required],
      nameSecondLanguage: [''],
    namePrefixEnglish:[''],
    firstNameEnglish :[''],
    middleNameEnglish :[''],
    lastNameEnglish :[''],
    nameSuffixEnglish :[''],
    namePrefixArabic :[''],
    firstNameArabic :[''],
    middleNameArabic :[''],
    lastNameArabic :[''],
    nameSuffixArabic :[''],
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
    buildingNoArabic :[''],
    streetEnglish :[''],
    streetArabic :[''],
    placeEnglish :[''],
    placeArabic :[''],
    district :[''],
    state :[''],
    country :[''],
    zipCode:[''],
    openingBalance :[''],
    creditLimit:[''],
    debitCredit :['0'],
    maxCreditDays:[''],
    salesManUUID:[''],
    traySecurityRequired:[''],
    isActive:    ['true'],
    accountUUID:[uuid],
    accountCode:['',Validators.required]
    });
  }

  addSupplierAddress(): void {
    this.supplierAddress.push(this.buildSupplierAddress());
  }

  onEmailChange(event: any, index: number) {
    const email = this.supplierEmailsArray.at(index).get('email').value;
    if (!email) {
      return;
    }
    const supplierId =
      this.supplier && this.supplier.id ? this.supplier.id : Guid.create();
    this.sub$.sink = this.supplierService
      .checkEmailOrPhoneExist(email, '', supplierId)
      .subscribe((c) => {
        const emailControl = this.supplierEmailsArray.at(index).get('email');
        if (c) {
          emailControl.setValidators([
            Validators.required,
            Validators.email,
            AlreadyExistValidator.exist(true),
          ]);
        } else {
          emailControl.setValidators([Validators.required, Validators.email]);
        }
        emailControl.updateValueAndValidity();
      });
  }
  onlyNumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onMobileNoChange(event: any) {
    const mobileno = this.supplierForm.get('mobileNo').value;
    if (!mobileno) {
      return;
    }
    const supplierId =
      this.supplier && this.supplier.id ? this.supplier.id : Guid.create();
    this.sub$.sink = this.supplierService
      .checkEmailOrPhoneExist('', mobileno, supplierId)
      .subscribe((c) => {
        const mobileNoControl = this.supplierForm.get('mobileNo');
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

  buildSupplierAddress(): FormGroup {
    if (this.supplier && this.supplier.supplierAddresses && this.supplier.supplierAddresses.length > 0) {
      const supplierAddress = this.supplier.supplierAddresses[0];
      if (supplierAddress.countryName) {
        const strCountryCity =
          supplierAddress.countryName + ':' + supplierAddress.cityName;
        this.filterCityObservable$.next(strCountryCity);
      }
      return this.fb.group({
        id: [supplierAddress.id],
        address: [supplierAddress.address, [Validators.required]],
        countryName: [supplierAddress.countryName, [Validators.required]],
        cityName: [supplierAddress.cityName, [Validators.required]],
      });
    } else {
      return this.fb.group({
        id: [null],
        address: ['', [Validators.required]],
        countryName: ['', [Validators.required]],
        cityName: ['', [Validators.required]],
      });
    }
  }

  buildSupplierEmail(): FormGroup {
    return this.fb.group({
      id: [''],
      supplierId: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  editSupplierEmail(supplierEmail: SupplierEmail): FormGroup {
    return this.fb.group({
      id: [supplierEmail.id],
      supplierId: [supplierEmail.supplierId],
      email: [supplierEmail.email, [Validators.required, Validators.email]]
    });
  }

  pushValuesSupplierEmailArray() {
    if (this.supplier.supplierEmails && this.supplier.supplierEmails.length > 0) {
      this.supplier.supplierEmails.map(supplierEmail => {
        this.supplierEmailsArray.push(this.editSupplierEmail(supplierEmail));
      })
    } else {
      const supplierEmail: SupplierEmail = {
        id: '',
        supplierId: this.supplier.id,
        email: ''
      }
      this.supplierEmailsArray.push(this.editSupplierEmail(supplierEmail));
    }
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
    this.isImageUpload = true;
    this.imgSrc = '';
  }

  getCountry() {
    const CountrySub$ = this.countryService.getActiveCountries().subscribe((data:Country[]) => {
      this.countries = data;
    });
    this.sub$.add(CountrySub$);
  }

  getSalesMan() {
    const saleMan$ = this.employeeService.getSalesMan().subscribe((data:Employee[]) => {
      this.employees = data;
    });
    this.sub$.add(saleMan$);
    
  }

  onCoutryChange(countryUUid:string) {
    const states$ = this.stateService.getStateByCountry(countryUUid,true).subscribe((data:State[]) => {
      this.states = data;
      this.districts=[];
    });
    // this.supplierForm.patchValue({state: [''],
    // });
    this.sub$.add(states$);
  }
  onStateChange(stateUuid:string) {
    const districts$ = this.districtService.getDistrictByState(stateUuid,true).subscribe((data:District[]) => {
      this.districts = data;
    });
    this.sub$.add(districts$);
  }

  handleFilterCity(cityName: string, index: number) {
    cityName = this.supplierAddress.at(index).get('cityName').value
    const country = this.supplierAddress.at(index).get('countryName').value;
    if (cityName && country) {
      const strCountryCity = country + ':' + cityName;
      this.filterCityObservable$.next(strCountryCity);
    }
  }

  onCountryChange(country, index: number) {
    this.supplierAddress.at(index).patchValue({
      cityName: '',
    });
    if (country.value) {
      const strCountry = country.value + ':' + '';
      this.filterCityObservable$.next(strCountry);
    } else {
      this.cities = [];
    }
  }

  onSupplierList() {
    this.location.back();
  }

  onSupplierSubmit() {
    if (this.supplierForm.valid) {
      const supObj = this.createBuildForm();
      supObj.supplierImage = this.imgSrc;
      supObj.isImageUpdate = this.isImageUpload;

      if (this.supplierAccount) {

        this.isLoading = true;
        this.sub$.sink = this.supplierService
          .updateSupplierAccount(this.supplierAccount.accountUUID, supObj)
          .subscribe((c) => {
            this.isLoading = false;
            this.toastrService.success('Supplier Updated Successfully');
            this.router.navigate(['/supplier']);
          }, () => this.isLoading = false);
      } else {
        this.isLoading = true;
        this.sub$.sink = this.supplierService
          .saveSupplierAccount(supObj)
          .subscribe((c) => {
            this.isLoading = false;
            this.toastrService.success('Supplier Added Successfully');
            this.router.navigate(['/supplier']);
          }, () => this.isLoading = false);
      }
    } else {
      this.markFormGroupTouched(this.supplierForm);
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

  createBuildForm(): ISupplierAccount {
    // const supplierAddress = this.supplierAddress.value;
    // const supplierEmails = this.supplierEmailsArray.value;

    const supplierObj: ISupplierAccount = {
      accountUUID: this.supplierForm.get('accountUUID').value,
      nameEnglish: this.supplierForm.get('nameEnglish').value,
      accountCode: this.supplierForm.get('accountCode').value,
      nameSecondLanguage: this.supplierForm.get('nameSecondLanguage').value,
      firstNameEnglish: this.supplierForm.get('firstNameEnglish').value,
      firstNameArabic: this.supplierForm.get('firstNameArabic').value,
      middleNameEnglish: this.supplierForm.get('middleNameEnglish').value,
      middleNameArabic: this.supplierForm.get('middleNameArabic').value,
      lastNameEnglish: this.supplierForm.get('lastNameEnglish').value,
      lastNameArabic: this.supplierForm.get('lastNameArabic').value,
      namePrefixEnglish: this.supplierForm.get('namePrefixEnglish').value,
      namePrefixArabic: this.supplierForm.get('namePrefixArabic').value,
      nameSuffixEnglish: this.supplierForm.get('nameSuffixEnglish').value,
      nameSuffixArabic: this.supplierForm.get('nameSuffixArabic').value,
      gstVatNo: this.supplierForm.get('gstVatNo').value,
      regCrNo: this.supplierForm.get('regCrNo').value,
      addRegNo: this.supplierForm.get('addRegNo').value,
      mobileCountryCode: this.supplierForm.get('mobileCountryCode').value,
      mobile: this.supplierForm.get('mobile').value,
      phoneCountryCode: this.supplierForm.get('phoneCountryCode').value,
      phone: this.supplierForm.get('phone').value,
      email: this.supplierForm.get('email').value,
      fax: this.supplierForm.get('fax').value,
      website: this.supplierForm.get('website').value,
      buildingNoEnglish: this.supplierForm.get('buildingNoEnglish').value,
      buildingNoArabic: this.supplierForm.get('buildingNoArabic').value,
      placeEnglish: this.supplierForm.get('placeEnglish').value,
      placeArabic: this.supplierForm.get('placeArabic').value,
      streetEnglish: this.supplierForm.get('streetEnglish').value,
      streetArabic: this.supplierForm.get('streetArabic').value,
      districtObject: this.districts.find(x=>x.districtUUID==this.supplierForm.get('district').value),
      stateObject: this.states.find(x=>x.stateUUID==this.supplierForm.get('state').value),
      countryObject:this.countries.find(x=>x.countryUUID==this.supplierForm.get('country').value) ,
      zipCode: this.supplierForm.get('zipCode').value,
      openingBalance:this.supplierForm.get('openingBalance').value ? this.supplierForm.get('openingBalance').value : 0,
      creditLimit:this.supplierForm.get('creditLimit').value ? this.supplierForm.get('creditLimit').value : 0,
      debitCredit: this.supplierForm.get('debitCredit').value,
      maxCreditDays:this.supplierForm.get('maxCreditDays').value ? this.supplierForm.get('maxCreditDays').value : 0,
      salesManUUID: this.supplierForm.get('salesManUUID').value,
      traySecurityRequired: true,
      isActive: this.supplierForm.get('isActive').value,
      imagePath: '',
      branchUUID:environment.branchUUID,
      supplierImage:''

    };
    return supplierObj;
  }

  onAddAnotherEmail() {
    const supplierEmail: SupplierEmail = {
      id: '',
      supplierId: this.supplier && this.supplier.id ? this.supplier.id : '',
      email: ''
    }
    this.supplierEmailsArray.insert(0, this.editSupplierEmail(supplierEmail));
  }

  onDeleteEmail(index: number) {
    this.supplierEmailsArray.removeAt(index);
  }
}
