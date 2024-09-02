import { IDevice } from "./device";
import { FinancialYearInfo } from "./financial-year-info";
import { FinancialYearStock } from "./financial-year-stock.interface";
import { FinancialYearAccount } from "./financialyear-account";

export interface FinancialReport {
    device: IDevice;
    financialYear: FinancialYearInfo;
    financialYearAccounts: FinancialYearAccount[];
    financialYearStocks: FinancialYearStock[];
    totalServerAccountingOpening: number;
    totalServerAccountingClosing: number;
    totalDeviceAccountingOpening: number;
    totalDeviceAccountingClosing: number;
    totalServerStockOpening: number;
    totalServerStockClosing: number;
    totalDeviceStockOpening: number;
    totalDeviceStockClosing: number;
  }
  