import { Product } from "../product";
import { PurchaseItemList } from "./purchase-item-list";

export interface IProductWiseReport{
    fromDate:            Date;
    toDate:              Date;
    product:             Product;
    totalQuantity:       number;
    totalDiscount:       number;
    totalGrossAmount:    number;
    totalAmount:         number;
    totalVatAmount:      number;
    totalSubTotalAmount: number;
    totalUnitRate:       number;
    purchaseItemList:    PurchaseItemList[];
}