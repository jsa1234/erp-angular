
import { Product } from "@core/domain-classes/product";
import { StockItemReportList } from "./stock-item-report-list";


export class StockItemReport{
    fromDate:                       Date;
    toDate:                         Date;
    product:                        Product;
    openingStockQuantity:           number;
    totalQuantitySales:             number;
    totalQuantitySalesReturn:       number;
    totalQuantityPurchase:          number;
    totalQuantityPurchaseReturn:    number
    totalRate:                      number;
    totalQuantityStockIn:           number;
    totalQuantityStockOut:          number;
    totalQuantityDamage:            number;
    stockItemReportList:            StockItemReportList[];
}
