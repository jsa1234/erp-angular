import { PurchaseReturnDetailReportList } from "./purhase-return-detail-report-list.interface";

export interface PurchaseReturnDetailReport{
    fromDate:               Date;
    toDate:                 Date;
    totalQuantity:          number;
    subTotal:               number;
    totalReturnQuantity:    number;
    grossAmountTotal:       number;
    discountTotal:          number;
    cgstAmountTotal:        number;
    sgstAmountTotal:        number;
    igstAmountTotal:        number;
    cessAmountTotal:        number;
    addnlCessAmountTotal:   number;
    totalAmount:            number;
    purchaseReturnItemList: PurchaseReturnDetailReportList[];
}