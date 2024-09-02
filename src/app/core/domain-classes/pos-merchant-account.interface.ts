import { Bank } from "./bank.interface";
import { POSDevice } from "./pos-device.interface";

export interface POSMerchantAccount{
    posMerchantUUID:              string;
    nameEnglish:                  string;
    nameSecondLanguage:           string;
    posMerchantType:              number;
    merchantIdentificationnumber: string;
    terminalIdentificationNumber: string;
    portalUrl:                    string;
    portalUsername:               string;
    portalPassword:               string;
    deviceCount:                  number;
    contactPersonName:            string;
    contactPersonPhone:           string;
    contactPersonEmail:           string;
    supportEmail:                 string;
    supportPhone:                 string;
    bankType:                     number;
    posMerchantImage:             string | ArrayBuffer;
    imagePath:                    string;
    posMerchantBanks:             Bank[];
    posMerchantDevices:           POSDevice[];
    posMerchantId:                number;
    createAt:                     Date;
    createdBy:                    null;
    modifiedBy:                   null;
    branchUUID:                   null;
    deviceUUID:                   null;
    branch:                       null;
    isImageUpdate:                boolean;
}