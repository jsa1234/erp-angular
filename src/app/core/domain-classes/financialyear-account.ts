export interface FinancialYearAccount {
    accountUUID:        string;
    accountCode:          string;
    accountNameEnglish:   string;
    accountNameArabic:    string;
    serverOpeningBalance: number;
    serverClosingBalance: number;
    deviceOpeningBalance: number;
    deviceClosingBalance: number;
    highlight?:boolean
}