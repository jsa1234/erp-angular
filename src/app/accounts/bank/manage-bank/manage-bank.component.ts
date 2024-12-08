import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankTypes } from '@core/domain-classes/bank-types.interface';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { BankService } from '../bank.service';
import { v4 as uuid } from 'uuid';
import { CountryService } from 'src/app/locations/country/country.service';
import { DistrictService } from 'src/app/locations/district/district.service';
import { StateService } from 'src/app/locations/state/state.service';
import { Country } from '@core/domain-classes/country';
import { Observable, forkJoin, of } from 'rxjs';
import { CommonError } from '@core/error-handler/common-error';
import { State } from '@core/domain-classes/state';
import { District } from '@core/domain-classes/district';
import { Bank } from '@core/domain-classes/bank.interface';
import { SecurityService } from '@core/security/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@core/services/common.service';
type ApiResponse<T> = T[] | CommonError;

@Component({
  selector: 'app-manage-bank',
  templateUrl: './manage-bank.component.html',
  styleUrls: ['./manage-bank.component.scss']
})
export class ManageBankComponent extends BaseComponent implements OnInit {
  bankForm:FormGroup
  bankTypes: BankTypes[] = [];
  countries: Country[] = [];
  states: State[] = [];
  districts: District[];
  imagePath$: Observable<string> = of('../../../../assets/images/dummy.jpg');
  branchUUID: string;
  isUpdate:boolean = false
  constructor(private fb:FormBuilder, 
    private bankService:BankService, 
    private toastr:ToastrService, 
    private countryService:CountryService,
    private districtService:DistrictService,
    securityService:SecurityService,
    private stateService:StateService,
    private loader:LoaderService,
    private router:Router,
    private route:ActivatedRoute,
    public commonServ:CommonService
  ) 
  {
    super();
    this.branchUUID = securityService.getUserDetail().branchUUID
  }

  ngOnInit(): void {
    this.loadInitialData()
    this.getBankDetails()
  }

  createForm():void{
    this.bankForm = this.fb.group({
      accountUUID: [uuid()],
      accountCode: ['',[Validators.required]],
      branchUUID:[this.branchUUID],
      bankType: [],
      nameEnglish: [{value:'',disabled:true}],
      namePrefixEnglish: ['',[Validators.required]],
      firstNameEnglish: ['',Validators.required],
      buildingNoEnglish: [''],
      streetEnglish: [''],
      placeEnglish: [''],
      zipCode: [''],
      phone: [''],
      email:  ['', [Validators.email]],
      districtUUID: [''],
      stateUUID: [''],
      countryUUID: [''],
      accountNo: ['',[Validators.required]],
      ifscCode: ['',[Validators.required]]
    });

  }

  saveBank(){
    if(this.bankForm.invalid){
      this.bankForm.markAllAsTouched();
      return;
    }

    const bankDetails:Bank = this.bankForm.getRawValue()
    this.isUpdate?this.updateBank(bankDetails):this.createBank(bankDetails)
  }

  createBank(bank:Bank):void{
    this.sub$.sink = this.bankService.createBank(bank).subscribe(()=>{
      this.toastr.success('Bank Created SUccessfully');
      this.router.navigate(['/bank']);
    },
    ()=>{
      this.toastr.error('Bank Created Failed');
    }
    )
  }
  updateBank(bank:Bank):void{
    this.sub$.sink = this.bankService.updateBank(bank).subscribe(()=>{
      this.toastr.success('Bank Updated SUccessfully');
      this.router.navigate(['/bank']);
    },
    ()=>{
      this.toastr.error('Bank Updated Failed');
    }
    )
  }

  loadInitialData(): void {
    this.bankTypes = [];
    this.countries = [];
    this.loader.show()
    forkJoin([
      this.bankService.getAllBankTypes(),
      this.countryService.getActiveCountries(),
    ]).subscribe(([bankTypes, countries]: [ApiResponse<BankTypes>, ApiResponse<Country>]) => {
      Array.isArray(bankTypes)?
        this.bankTypes = bankTypes : this.bankTypes = [];
  
      Array.isArray(countries)?
        this.countries = countries : this.countries = [];

        console.log(this.bankTypes,this.countries)
    },
    ()=>{
      this.toastr.error('Something Went Wrong')
      this.loader.hide()
    },
    ()=>{
      this.loader.hide()
    }
    );
  }
  


  getStateByCountry(countryUUID:string):void{
    this.states = []

    this.sub$.sink = this.stateService.getStateByCountry(countryUUID,true).subscribe((res:State[])=>{
      this.states = res
    })
  }

  getDistrictByState(stateUUID:string):void{
    this.districts = []
    this.sub$.sink = this.districtService.getDistrictByState(stateUUID,true).subscribe((res:District[])=>{
      this.districts = res
    })
  }


  getBankDetails(): void {
    this.route.data.subscribe(
      (data: { resolvedBankData: [Bank, BankTypes[]] }) => {
        this.createForm();
        if (!data.resolvedBankData) {
          this.isUpdate = false
          return;
        }
        this.isUpdate = true
          const [bank, bankTypes] = data.resolvedBankData;
          this.patchFormValue({ ...bank })
          this.getStateByCountry(bank.countryObject.countryUUID)
          this.getDistrictByState(bank.stateObject.stateUUID)
          const selectedBankDetails = bankTypes.find(x=>x.value == bank.bankType)
          this.imagePath$ = this.bankService.getBankImagePath(selectedBankDetails.fileName);

      }
    );
  }
  patchFormValue(bank:Bank):void{
    this.bankForm.patchValue({
      accountUUID:bank.accountUUID,
      accountCode: bank.accountCode,
      bankType: bank.bankType,
      nameEnglish:bank.nameEnglish,
      namePrefixEnglish:bank.namePrefixEnglish,
      firstNameEnglish: bank.firstNameEnglish,
      buildingNoEnglish: bank.buildingNoEnglish,
      streetEnglish: bank.streetEnglish,
      placeEnglish: bank.placeEnglish,
      zipCode: bank.zipCode,
      phone: bank.phone,
      email: bank.email,
      districtUUID: bank.districtObject?.districtUUID,
      stateUUID: bank.stateObject?.stateUUID,
      countryUUID: bank.countryObject?.countryUUID,
      accountNo: bank.accountNo,
      ifscCode: bank.ifscCode
    })
  }


  setBankNameAndImage(value:number){
      const selectedBankDetails = this.bankTypes.find(bank => bank.value === value);
      this.bankForm.patchValue({ nameEnglish: selectedBankDetails?.text || '' });
      this.imagePath$ = this.bankService.getBankImagePath(selectedBankDetails.fileName);
  }


}
