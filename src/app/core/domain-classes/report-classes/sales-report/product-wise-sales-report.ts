import { IProduct } from "@core/domain-classes/product";
import { SalesReportByLineItemList } from "./sales-report-by-line-item-list";

export interface ProductWiseSalesReport {
    fromDate:                  Date;
    toDate:                    Date;
    product:                   IProduct;
    transactionMode:           number;
    totalQuantity:             number;
    totalUnitPrice:            number;
    totalSubTotalAmount:       number;
    totalDiscountAmount:       number;
    totalGrossAmount:          number;
    totalVatAmount:            number;
    totalNetItemTotalAmount:   number;
    salesReportByLineItemList: SalesReportByLineItemList[];
}