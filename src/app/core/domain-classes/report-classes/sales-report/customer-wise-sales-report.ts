import { ICustomerAccount } from "@core/domain-classes/customer-account";
import { SalesSummaryReportByClientInnerList } from "./sales-summary-report-by-client-inner-list";

export class CustomerWiseSalesReport{
    fromDate:                            Date;
    toDate:                              Date;
    client:                              ICustomerAccount;
    amount:                              number;
    discountAmount:                      number;
    grossAmount:                         number;
    vatAmount:                           number;
    itemTotalAmount:                     number;
    salesSummaryReportByClientInnerList: SalesSummaryReportByClientInnerList[];
}