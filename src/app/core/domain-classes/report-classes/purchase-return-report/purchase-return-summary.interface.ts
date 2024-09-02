import { PurchaseReturnSummaryList as PurchaseReturnSummaryReportList } from "./purchase-return-summary-list.interface";

export interface PurchaseReturnSummaryReport{
    fromDate:                  null;
    toDate:                    null;
    transactionMode:           string;
    subTotal:                  number;
    discountTotal:             number;
    grossAmountTotal:          number;
    cgstTotalAmount:           number;
    sgstTotalAmount:           number;
    igstTotalAmount:           number;
    cessTotalAmount:           number;
    addnlCessTotalAmount:      number;
    totalAmount:               number;
    purchaseReturnSummaryList: PurchaseReturnSummaryReportList[];
}

