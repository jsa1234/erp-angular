import { ICustomerAccount } from "@core/domain-classes/customer-account";
import { ISalesReportlist } from "./sales-report-list";

export class BillWiseSalesReport{
    fromDate:         Date;
    toDate:           Date;
    client:           ICustomerAccount;
    transactionMode:  string;
    subTotal:         number;
    discountTotal:    number;
    grossAmountTotal: number;
    vatTotalAmount:   number;
    totalAmount:      number;
    salesReportlists: ISalesReportlist[];
    cgstTotalAmount:      number;
    sgstTotalAmount:      number;
    igstTotalAmount:      number;
    cessTotalAmount:      number;
    addnlCessTotalAmount: number;
}


