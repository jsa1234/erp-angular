export interface POSPrinter {
    posPrinterUUID?:            string;
    posPrinterId?:              number;
    nameEnglish?:               string;
    nameSecondLanguage?:        string;
    descriptionEnglish?:        string;
    descriptionSecondLanguage?: string;
    ipAddress?:                 string;
    portNo?:                    number;
    paperWidth?:                number;
    modelName?:                 string;
    serialNo?:                  string;
    printSpeed?:                string;
    haveBattery?:               boolean;
    hasBluetooth?:              boolean;
    hasWifi?:                   boolean;
    hasEthernet?:               boolean;
    hasUSB?:                    boolean;
    imagePath?:                 string;
    printerImage?:              string | ArrayBuffer;
    createAt?:                  Date;
    createdBy?:                 string;
    modifiedBy?:                string;
    branchUUID?:                string;
    deviceUUID?:                string;
    isImageUpdate?:             boolean;
    isActive?:                  boolean;
}