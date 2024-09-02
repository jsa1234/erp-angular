import { Bank } from "./bank.interface";

export interface POSDevice {
    posDeviceUUID?:             string;
    posDeviceId?:               number;
    posDeviceCode?:             string;
    nameEnglish?:               string;
    nameSecondLanguage?:        string;
    deviceModel?:               string;
    serialNo?:                  string;
    appKey?:                    string;
    username?:                  string;
    password?:                  string;
    haveRearCamera?:            boolean;
    haveFrontCamera?:           boolean;
    haveWifi?:                  boolean;
    haveSim?:                   boolean;
    haveUsb?:                   boolean;
    havePrinter?:               boolean;
    printingPaperSize?:         string;
    haveNfc?:                   boolean;
    haveMagneticCardReader?:    boolean;
    haveBattery?:               boolean;
    haveBluetooth?:             boolean;
    haveUpiEnabled?:            boolean;
    imeI1?:                     string;
    imeI2?:                     string;
    bluetoothMac?:              string;
    wifiMac?:                   string;
    brandName?:                 string;
    descriptionEnglish?:        string;
    descriptionSecondLanguage?: string;
    createAt?:                  Date;
    createdBy?:                 string;
    modifiedBy?:                string;
    branchUUID?:                string;
    deviceUUID?:                string;
    imagePath?:                 string;
    deviceImage?:               string | ArrayBuffer;   
    isImageUpdate?:             boolean
    posMerchantUUID?:           string;
    posMerchantDevicesUUID?:    string;
    posMerchantDeviceBanks?:    Bank[];
    bankName?:                  string;
    bankUUID?:                  string;
}