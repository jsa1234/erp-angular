import { FinancialYearStockCompareItems } from "./FinancialYearStockCompareItems";

export interface FinancialYearStock {
    productUUID?:string;
    productPriceUUID?:string
    productNameEnglish?: string;
    productNameArabic?: string;
    unitNameEnglish?: string;
    unitNameArabic?: string;
    serverOpeningBalance: number;
    serverClosingBalance: number;
    deviceOpeningBalance: number;
    deviceClosingBalance: number;
    categoryEnglish:    string;
    categoryArabic:     null;
    subCategoryEnglish: string;
    subCategoryArabic:  null;
    brandEnglish:       string;
    brandArabic:        null;
    productPrices:      FinancialYearStockCompareItems[];
  }
  