import { PurchaseItemList } from "./purchase-item-list";

export class DetailedReport{
    fromDate:         Date;
    toDate:           Date;
    totalQuantity:    number;
    discountTotal:    number;
    vatAmountTotal:   number;
    totalAmount:      number;
    purchaseItemList: PurchaseItemList[];
    cgstAmountTotal:      number;
    sgstAmountTotal:      number;
    igstAmountTotal:      number;
    cessAmountTotal:      number;
    addnlCessAmountTotal: number;
    grossAmountTotal: number;
    subTotal: number;
}