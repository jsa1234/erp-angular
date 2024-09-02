import { SalesInvoiceItemReportlist } from "./sales-invoice-item-report-list";

export interface DetailedSalesReport{
    fromDate:                    Date;
    toDate:                      Date;
    amount:                      number;
    discountAmount:              number;
    vatAmount:                   number;
    itemTotalAmount:             number;
    cgstAmount:                  number;
    sgstAmount:                  number;
    igstAmount:                  number;
    cessAmount:                  number;
    addnlCessAmount:             number;
    totalQuantity:               number;
    subTotal:                    number;
    grossAmountTotal:            number;
    salesInvoiceItemReportlists: SalesInvoiceItemReportlist[];
}