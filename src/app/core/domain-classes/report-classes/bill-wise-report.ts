import { PurchaseSummaryList } from "./purchase-summary-list";

export class BillWiseReport{
    fromDate:            Date;
    toDate:              Date;
    transactionMode:     string;
    subTotal:            number;
    discountTotal:       number;
    grossAmountTotal:    number;
    vatTotalAmount:      number;
    totalAmount:         number;
    purchaseSummaryList: PurchaseSummaryList[];
    cgstTotalAmount:      number;
    sgstTotalAmount:      number;
    igstTotalAmount:      number;
    cessTotalAmount:      number;
    addnlCessTotalAmount: number;
}