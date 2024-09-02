
export interface ICompany {
    companyId?:         number;
    companyUUID?:       string;
    companyCode?:       string;
    nameEnglish?:       string;
    nameSecondLanguage?:        string;
    mobileNo?:          string;
    mobileCountryCode?: string;
    phoneNo?:           string;
    phoneCountryCode?:  string;
    email?:             string;
    website?:           string;
    buildingNoEnglish?: string;
    buildingNoSecondLanguage?:  string;
    streetEnglish?:     string;
    streetSecondLanguage?:      string;
    placeEnglish?:      string;
    placeSecondLanguage?:       string;
    districtEnglish?:   string;
    districtSecondLanguage?:    string;
    stateEnglish?:      string;
    stateSecondLanguage?:       string;
    countryEnglish?:    string;
    countrySecondLanguage?:     string;
    zipCodeEnglish?:    string;
    zipCodeSecondLanguage?:     string;
    googleMapUrl?:      string;
    latitude?:          string;
    longitude?:         string;
    registrationNo?:    string;
    gstVatNo?:          string;
    additionalNo?:      string;
    startDate?:         Date;
    installationDate?:  Date;
    renewalDate?:       Date;
    logo?:              string;
    imageData?:         string;
    currencyCode?:         string;
    crNo?:         string;
    monochromeImagePath?:      string;
    monochromeImageData?:      null;
    facebookUrl?:              null;
    instagramUrl?:             null;
    whatsappNo?:               null;
    telegramUrl?:              null;
    linkedUrl?:                null;
    twiterUrl?:                null;
    fssaiNumber?:              null;
}



export class Company implements ICompany {
    #_nameEnglish:       string
    #_nameSecondLanguage:        string
    #_mobileNo:          string;
    #_mobileCountryCode: string;
    #_phoneNo:           string;
    #_phoneCountryCode:  string;
    #_email:              string
    #_buildingNoEnglish: string;
    #_buildingNoSecondLanguage:  string;
    #_streetEnglish:     string;
    #_streetSecondLanguage:      string;
    #_placeEnglish:      string;
    #_placeSecondLanguage:       string;
    #_districtEnglish:   string;
    #_districtSecondLanguage:    string;
    #_stateEnglish:      string;
    #_stateSecondLanguage:       string;
    #_countryEnglish:    string;
    #_countrySecondLanguage:     string;
    #_zipCodeEnglish:    string;
    #_zipCodeSecondLanguage:     string;
    #_registrationNo:    string;
    #_gstVatNo:          string;
    #_additionalNo:      string;
    #_logo:              string;
    #_crNo:              string;
    #_companyUUID:              string;

    constructor(data:ICompany) {
        this.#_nameEnglish = data?.nameEnglish
        this.#_nameSecondLanguage = data?.nameSecondLanguage
        this.#_mobileCountryCode = data?.mobileCountryCode
        this.#_mobileNo = data?.mobileNo
        this.#_phoneCountryCode = data?.phoneCountryCode
        this.#_phoneNo = data?.phoneNo
        this.#_email = data?.email
        this.#_logo = data?.logo
        this.#_buildingNoEnglish = data?.buildingNoEnglish
        this.#_streetEnglish = data?.streetEnglish
        this.#_placeEnglish = data?.placeEnglish
        this.#_districtEnglish = data?.districtEnglish
        this.#_stateEnglish = data?.stateEnglish
        this.#_countryEnglish = data?.countryEnglish
        this.#_zipCodeEnglish = data?.zipCodeEnglish
        this.#_additionalNo = data?.additionalNo
        this.#_registrationNo = data?.registrationNo
        this.#_crNo = data?.crNo
        this.#_buildingNoSecondLanguage = data?.buildingNoSecondLanguage
        this.#_streetSecondLanguage = data?.streetSecondLanguage
        this.#_placeSecondLanguage = data?.placeSecondLanguage
        this.#_districtSecondLanguage = data?.districtSecondLanguage
        this.#_stateSecondLanguage = data?.stateSecondLanguage
        this.#_countrySecondLanguage = data?.countrySecondLanguage
        this.#_zipCodeSecondLanguage = data?.zipCodeSecondLanguage
        this.#_gstVatNo = data?.gstVatNo
        this.#_companyUUID = data?.companyUUID
        
    }
    
    public get companyUUID():string {
        return this.#_companyUUID
    }
    public get nameEnglish():string {
        return this.#_nameEnglish
    }
    public get nameSecondLanguage():string {
        return this.#_nameSecondLanguage
    }
    public get addressEnglish(): string {
        const components = [
          this.#_buildingNoEnglish,
          this.#_streetEnglish,
          this.#_placeEnglish,
          this.#_districtEnglish,
          this.#_stateEnglish,
          this.#_countryEnglish,
          this.#_zipCodeEnglish ? `Zip Code: ${this.#_zipCodeEnglish}` : null
        ];
        return components.filter(c => c).join(', ');
      }
    public get addressArabic(): string {
        const components = [
          this.#_buildingNoSecondLanguage,
          this.#_streetSecondLanguage,
          this.#_placeSecondLanguage,
          this.#_districtSecondLanguage,
          this.#_stateSecondLanguage,
          this.#_countrySecondLanguage,
          this.#_zipCodeSecondLanguage ? `الرمز البريدي: ${this.#_zipCodeSecondLanguage}` : null
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
    public get logo():string {
        return `${this.#_logo}`
    }

    public get vatRegNo():string{
        return this.#_gstVatNo
    }
    public get additionalNo():string{
        return this.#_additionalNo
    }
    public get registrationNo():string{
        return this.#_registrationNo
    }
    public get crNo():string{
        return this.#_crNo
    }

    public get buildingNoEnglish():string{
        return this.#_buildingNoEnglish
    }
    public get buildingNoSecondLanguage():string{
        return this.#_buildingNoSecondLanguage
    }
    public get zipCodeSecondLanguage():string{
        return this.#_zipCodeSecondLanguage
    }
    public get zipCodeEnglish():string{
        return this.#_zipCodeEnglish
    }
    public get streetEnglish():string{
        return this.#_streetEnglish
    }
    public get streetSecondLanguage():string{
        return this.#_streetSecondLanguage
    }
    public get districtEnglish():string{
        return this.#_districtEnglish
    }
    public get districtSecondLanguage():string{
        return this.#_districtSecondLanguage
    }
    public get placeEnglish():string{
        return this.#_placeEnglish
    }
    public get placeSecondLanguage():string{
        return this.#_placeSecondLanguage
    }
}