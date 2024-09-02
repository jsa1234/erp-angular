export interface AccountOpeningBalance{
    accountOpeningBalanceUUID: string;
    accountUUID:               string;
    branchUUID:                string;
    deviceUUID:                string;
    openingBalance:            number;
    debitCredit:               number;
    creditLimit:               number;
    maxCreditDays:             number;
    nameEnglish:               string;
    nameSecondLanguage:        string;
    accountCode:               string;
}