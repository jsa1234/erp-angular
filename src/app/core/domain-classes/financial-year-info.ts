import { FinancialYearPhase } from "./enums/financial-year-phase .enum";

export interface FinancialYearInfo {
    financialYearUUID: string;
    financialYearId: number;
    startDate: Date;
    endDate: Date;
    dbName: string | null;
    status: FinancialYearPhase;
    year: string;
    nameEnglish:  string | null;
    nameSecondLanguage:   string | null;
    nextFinancialYearUUID: string;
    isCurrentFinancialYear:boolean
  }
