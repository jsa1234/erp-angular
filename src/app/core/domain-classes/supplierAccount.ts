import { State } from "./state";
import { District } from "./district";
import { Country } from "./country";
export interface ISupplierAccount {
    accountUUID?:          string;
    branchUUID?:           string;
    accountCode?:          string;
    accountType?:          number;
    nameEnglish?:          string;
    nameSecondLanguage?:           string;
    namePrefixEnglish?:    string;
    firstNameEnglish?:     string;
    middleNameEnglish?:    string;
    lastNameEnglish?:      string;
    nameSuffixEnglish?:    string;
    namePrefixArabic?:     string;
    firstNameArabic?:      string;
    middleNameArabic?:     string;
    lastNameArabic?:       string;
    nameSuffixArabic?:     string;
    gstVatNo?:             string;
    regCrNo?:              string;
    addRegNo?:             string;
    mobileCountryCode?:    string;
    mobile?:               string;
    phoneCountryCode?:     string;
    phone?:                string;
    email?:                string;
    website?:              string;
    fax?:                  string;
    imagePath?:            string;
    supplierImage?:        string;
    isImageUpdate?:        boolean;
    buildingNoEnglish?:    string;
    buildingNoArabic?:     string;
    streetEnglish?:        string;
    streetArabic?:         string;
    placeEnglish?:         string;
    placeArabic?:          string;
    districtObject?:       District;
    stateObject?:          State;
    countryObject?:        Country;
    district?:             string;
    state?:                string;
    country?:              string;
    zipCode?:              string;
    openingBalance?:       number;
    creditLimit?:          number;
    debitCredit?:          number;
    maxCreditDays?:        number;
    salesMan?:             string;
    salesManUUID?:         string;
    traySecurityRequired?: boolean;
    isActive?:             boolean;
    isUpdate?:             boolean;
    }

    export class SupplierAccount implements ISupplierAccount{
        #_nameEnglish:string
        #_nameSecondLanguage:string
        #_district:District
        #_country:Country
        #_state:State
        #_buildingNoEnglish:string
        #_buildingNoArabic:string
        #_streetEnglish:string
        #_streetArabic:string
        #_placeEnglish:string
        #_placeArabic:string
        #_zipcode:string
        #_mobileCountryCode:string
        #_mobileNo:string
        #_phoneCountryCode:string
        #_phoneNo:string
        #_email:string

        constructor(value:ISupplierAccount){
           this. #_nameEnglish = value.nameEnglish
            this.#_nameSecondLanguage = value.nameSecondLanguage
            this.#_district =value.districtObject 
            this.#_country =value.countryObject
            this.#_state = value.stateObject
            this.#_buildingNoEnglish = value.buildingNoEnglish
            this.#_buildingNoArabic = value.buildingNoArabic
            this.#_streetEnglish = value.streetEnglish
            this.#_streetArabic = value.streetArabic
            this.#_placeEnglish = value.placeEnglish
            this.#_placeArabic = value.placeArabic
            this.#_zipcode = value.zipCode
            this.#_mobileCountryCode = value?.mobileCountryCode
            this.#_mobileNo = value?.mobile
            this.#_phoneCountryCode = value?.phoneCountryCode
            this.#_phoneNo = value?.phone
            this.#_email = value?.email
        }

        public get nameEnglish(): string {
            return this. #_nameEnglish;
        }
        public get nameSecondLanguage(): string {
            return this.#_nameSecondLanguage;
        }
        public get district(): string {
            return this.#_district.nameEnglish; 
        }
        public get country(): string {
            return this.#_country.nameEnglish; 
        }
        public get state(): string {
            return this.#_state.nameEnglish; 
        }
        public get districtArabic(): string {
            return this.#_district.nameSecondLanguage; ; 
        }
        public get countryArabic(): string {
            return this.#_country.nameSecondLanguage; 
        }
        public get stateArabic(): string {
            return this.#_state.nameSecondLanguage; 
        }
        public get buildingNoEnglish(): string {
            return this. #_buildingNoEnglish;
        }
        public get buildingNoArabic(): string {
            return this. #_buildingNoArabic;
        }
        public get streetEnglish(): string {
            return this. #_streetEnglish;
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

        public get addressEnglish(): string {
            const components = [
              this.#_buildingNoEnglish,
              this.#_streetEnglish,
              this.#_placeEnglish,
              this.#_district?this.#_district.nameEnglish:null,
              this.#_state?this.#_state.nameEnglish:null,
              this.#_country?this.#_country.nameEnglish:null,
              this.#_zipcode ? ` - ${this.#_zipcode}` : null
            ];
          
            return components.filter(c => c).join(', ');
          }

        public get addressArabic(): string {
            const components = [
              this.#_buildingNoArabic,
              this.#_streetArabic,
              this.#_placeArabic,
              this.#_district?this.#_district.nameSecondLanguage:null,
              this.#_state?this.#_state.nameSecondLanguage:null,
              this.#_country?this.#_country.nameSecondLanguage:null,
              this.#_zipcode ? ` - ${this.#_zipcode}` : null
            ];
          
            return components.filter(c => c).join(', ');
          }


          public get mobileNo():string {
            return `${this.#_mobileCountryCode} ${this.#_mobileNo}`
        }
        public get phoneNo():string {
            return `${this.#_phoneCountryCode} ${this.#_phoneNo}`
        }
        public get email():string {
            return this.#_email
        }
          
    }
    