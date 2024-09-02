export interface DrCrAccount {
    accountId:            number;
    accountUUID:          string;
    branchId:             number;
    branchUUID:           string;
    accountCode:          string;
    accountType:          number;
    nameEnglish:          string;
    nameSecondLanguage:           string;
    openingBalance:       number;
    debitCredit:          number;
    traySecurityRequired: boolean;
    accLevel:             number;
    accGroup:             number;
    isDelete:             boolean;
    accParentId:          number;
    accParentUUID:        string;
}