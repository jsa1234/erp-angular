import { IDevice } from "./device";
import { FinancialYearInfo } from "./financial-year-info";

export interface DeviceFinancialYear{
    deviceFinancialYearUUID: string;
    deviceFinancialYearId:   number;
    financialYearUUID:       string;
    deviceUUID:              string;
    status:                  number;
    isCurrentFinancialYear:  boolean;
    device:                  IDevice;
    financialYear:           FinancialYearInfo;
}