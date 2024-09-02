import { State } from "./state";
import { District } from "./district";
import { Country } from "./country";
export interface ICustomerAccount {
    accountUUID ?:string
    branchUUID ?:string
    accountCode ?:string
    nameEnglish ?:string
    nameSecondLanguage?:string
    namePrefixEnglish?:string
    firstNameEnglish ?:string
    middleNameEnglish ?:string
    lastNameEnglish ?:string
    nameSuffixEnglish ?:string
    namePrefixArabic ?:string
    firstNameArabic ?:string
    middleNameArabic ?:string
    lastNameArabic ?:string
    nameSuffixArabic ?:string
    gstVatNo ?:string
    regCrNo ?:string
    addRegNo ?:string
    mobileCountryCode ?:string
    mobile ?:string
    phoneCountryCode ?:string
    phone ?:string
    email ?:string
    website ?:string
    fax ?:string
    imagePath ?:string
    clientImage?: string 
    isImageUpload?:boolean
    buildingNoEnglish ?:string
    buildingNoArabic ?:string
    streetEnglish ?:string
    streetArabic ?:string
    placeEnglish ?:string
    placeArabic ?:string
    district? :string
    state ?:string
    country ?:string
    districtObject ?:District
    stateObject? :State
    countryObject? :Country
    zipCode?:string
    openingBalance ?:number
    creditLimit?:number
    debitCredit ?:boolean
    maxCreditDays?:number
    salesManUUID?:string
    traySecurityRequired?:boolean
    isActive?:    boolean;
    isUpdate?:boolean;
    salesMan?:string;
    PhoneNumber?:string;
    MobileNumber?:string;
    }


    export class CustomerAccount implements ICustomerAccount{
        #_nameEnglish:string
        #_nameArabic:string
        #_district:string
        #_country:string
        #_state:string
        #_districtObj:District
        #_countryObj:Country
        #_stateObj:State
        #_buildingNoEnglish:string
        #_buildingNoArabic:string
        #_streetEnglsh:string
        #_streetArabic:string
        #_placeEnglish:string
        #_placeArabic:string
        #_zipcode:string
        #_mobile:string
        #_mobileCountryCode:string
        #_phone:string
        #_phoneCountryCode:string
        #_addRegNo:string
        #_gstVatNo:string
        #_regCrNo:string
        #_email: string;
        constructor( value:ICustomerAccount){
            this. #_nameEnglish = value.nameEnglish
            this.#_nameArabic = value.nameSecondLanguage
            this.#_district =value.district
            this.#_country =value.country
            this.#_state = value.state
            this.#_districtObj =value.districtObject
            this.#_countryObj =value.countryObject
            this.#_stateObj = value.stateObject
            this.#_buildingNoEnglish = value.buildingNoEnglish
            this.#_buildingNoArabic = value.buildingNoArabic
            this.#_streetEnglsh = value.streetEnglish
            this.#_streetArabic = value.streetArabic
            this.#_placeEnglish = value.placeEnglish
            this.#_placeArabic = value.placeArabic
            this.#_zipcode = value.zipCode
            this.#_mobile = value.mobile
            this. #_mobileCountryCode = value.mobileCountryCode
            this.#_phone = value.phone
            this.#_phoneCountryCode = value.phoneCountryCode
            this.#_addRegNo = value.addRegNo
            this.#_gstVatNo = value.gstVatNo
            this.#_regCrNo = value.regCrNo
            this.#_email = value.email
        }
        public get nameEnglish(): string {
            return this. #_nameEnglish;
        }
        public get nameSecondLanguage(): string {
            return this.#_nameArabic;
        }
        public get district(): string {
            let obj = JSON.parse(this.#_district);
            return obj?.NameEnglish; 
        }
        public get country(): string {
            let obj = JSON.parse(this.#_country);
            return obj?.NameEnglish
        }
        public get state(): string {
            let obj = JSON.parse(this.#_state);
            return obj?.NameEnglish
        }
        public get districtArabic(): string {
            let obj = JSON.parse(this.#_district);
            return obj?.NameArabic; 
        }
        public get countryArabic(): string {
            let obj = JSON.parse(this.#_country);
            return obj?.NameArabic
        }
        public get stateArabic(): string {
            let obj = JSON.parse(this.#_state);
            return obj?.NameArabic
        }
        public get buildingNoEnglish(): string {
            return this. #_buildingNoEnglish;
        }
        public get buildingNoArabic(): string {
            return this. #_buildingNoArabic;
        }
        public get streetEnglish(): string {
            return this. #_streetEnglsh;
        }
        public get streetArabic(): string {
            return this. #_streetArabic;
        }
        public get placeEnglish(): string {
            return this. #_placeEnglish;
        }
        public get placeArabic(): string {
            return this. #_placeArabic;
        }
        public get zipCode(): string {
            return this. #_zipcode;
        }
        public get mobileNumber(): string {
            return this.#_mobile?`${ this.#_mobileCountryCode} ${this.#_mobile}`:'';
        }
        public get phoneNumber(): string {
            return this.#_phone?`${ this.#_phoneCountryCode} ${this.#_phone}`:'';
        }
        public get addRegNo(): string {
            return this.#_addRegNo;
        }
        public get gstVatNo(): string {
            return this.#_gstVatNo;
        }
        public get regCrNo(): string {
            return this.#_regCrNo;
        }
        public get email(): string {
            return this.#_email;
        }

        public get addressEnglish(): string {
            const components = [
              this.#_buildingNoEnglish,
              this.#_streetEnglsh,
              this.#_placeEnglish,
              this.#_district?this.#_districtObj?.nameEnglish:null,
              this.#_state?this.#_stateObj?.nameEnglish:null,
              this.#_country?this.#_countryObj?.nameEnglish:null,
              this.#_zipcode ? ` - ${this.#_zipcode}` : null
            ];
          
            return components.filter(c => c).join(', ');
          }


          public get addressArabic(): string {
            const components = [
              this.#_buildingNoArabic,
              this.#_streetArabic,
              this.#_placeArabic,
              this.#_district?this.#_districtObj?.nameSecondLanguage:null,
              this.#_state?this.#_stateObj?.nameSecondLanguage:null,
              this.#_country?this.#_countryObj?.nameSecondLanguage:null,
              this.#_zipcode ? ` - ${this.#_zipcode}` : null
            ];
          
            return components.filter(c => c).join(', ');
          }
    }