import { SaleReturnDetailedReportList } from "./sale-return-detiled-report-list.interface";

export interface SaleReturnDetailedReport {
    fromDate:                    Date;
    toDate:                      Date;
    amount:                      number;
    discountAmount:              number;
    grossAmount:                 number;
    cgstAmount:                  number;
    sgstAmount:                  number;
    igstAmount:                  number;
    cessAmount:                  number;
    addnlCessAmount:             number;
    itemTotalAmount:             number;
    salesReturnDetailReportList: SaleReturnDetailedReportList[];
}