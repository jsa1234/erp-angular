import { BranchType } from "./enums/branch-type.enum";

export interface IBranch {
    branchId?:                 number;
    branchUUID?:               string;
    companyId?:                number;
    companyUUID?:              string;
    companyCode?:              string;
    nameEnglish?:              string;
    nameSecondLanguage?:       string;
    mobileNo?:                 string;
    mobileCountryCode?:        string;
    phoneNo?:                  string;
    phoneCountryCode?:         string;
    email?:                    string;
    website?:                  null;
    buildingNoEnglish?:        string;
    buildingNoSecondLanguage?: string;
    streetEnglish?:            string;
    streetSecondLanguage?:     string;
    placeEnglish?:             string;
    placeSecondLanguage?:      string;
    districtEnglish?:          string;
    districtSecondLanguage?:   string;
    stateEnglish?:             string;
    stateSecondLanguage?:      string;
    countryEnglish?:           string;
    countrySecondLanguage?:    string;
    zipCodeEnglish?:           null;
    zipCodeSecondLanguage?:    null;
    googleMapUrl?:             null;
    latitude?:                 string;
    longitude?:                string;
    registrationNo?:           string;
    gstVatNo?:                 string;
    additionalNo?:             string;
    fssaiNumber?:             string;
    startDate?:                Date;
    installationDate?:         Date;
    renewalDate?:              Date;
    logo?:                     null;
    syncFlag?:                 number;
    branchType?:               BranchType
    isHeadOffice?:              boolean;
}