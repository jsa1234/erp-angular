import { SaleReturnSummaryReportList } from "./sale-return-summary-report-list.interface";

export interface SaleReturnSummaryReport {
    fromDate:               Date;
    toDate:                 Date;
    transactionMode:        string;
    subTotal:               number;
    discountTotal:          number;
    grossAmountTotal:       number;
    cgstTotalAmount:        number;
    sgstTotalAmount:        number;
    igstTotalAmount:        number;
    cessTotalAmount:        number;
    addnlCessTotalAmount:   number;
    totalAmount:            number;
    salesReturnReportlists: SaleReturnSummaryReportList[];
}