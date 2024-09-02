import { StockGeneralReportList } from "./general-stock-report";


export class GeneralStockReport{
    fromDate:            Date;
    toDate:              Date;
    totalQuantitySales:  number;
    totalQuantitySalesReturn:number;
    totalQuantityPurchase:number;
    totalQuantityPurchaseReturn: number;
    totalCurrentStock:number;
    totalCurrentCost:number;
    totalStockValue:number;
    subtotal: number;
    stockGeneralReportList:StockGeneralReportList[];
    totalQuantityStockIn:        number;
    totalQuantityStockOut:       number;
    totalQuantityDamage:         number;
}
