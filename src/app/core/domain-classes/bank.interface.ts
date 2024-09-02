import { Country } from "./country";
import { District } from "./district";
import { State } from "./state";

export interface Bank {
    accountUUID?:        string;
    branchUUID?:         string;
    accountCode?:        string;
    accountType?:        number;
    nameEnglish?:        string;
    namePrefixEnglish?:  string;
    nameSecondLanguage?: string;
    firstNameEnglish?:   string;
    buildingNoEnglish?:  string;
    streetEnglish?:      string;
    placeEnglish?:       string;
    district?:           string;
    state?:              string;
    country?:            string;
    zipCode?:            string;
    phone?:              string
    email?:              string;
    districtUUID?:       string;
    stateUUID?:          string;
    countryUUID?:        string;
    accountNo?:          string;
    ifscCode?:           string;
    districtObject?:     District;
    stateObject?:        State;
    countryObject?:      Country;
    bankType?:           number
    posMerchantBankUUID: string;
    posMerchantUUID:     string;
    isDefaultBank:       boolean;
    createAt:            Date;
    createdBy:           null;
    modifiedBy:          null;
    deviceUUID:          null;
    account:             Bank;
}