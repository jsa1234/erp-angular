
import { Product } from "@core/domain-classes/product";

export interface StockGeneralReportList {
    baseQuantity:           number;
    currentCost:            number;
    currentStock:           number;
    damageQuantity:         number;
    openingStockQuantity:   number;
    openingStockValue:      number;
    product:                Product;
    purchaseQty:            number;
    purchaseReturnQty:      number;
    salesQty:               number;
    salesReturnQty:         number;
    stockDynamic:           any;
    stockInQuantity:        number;
    stockOutQuantity:       number;
    stockValue:             number;
    totoalQty:              number;
    transactionType:        number;
}








