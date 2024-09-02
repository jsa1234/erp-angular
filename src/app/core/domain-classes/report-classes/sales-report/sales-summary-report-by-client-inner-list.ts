import { IProduct } from "@core/domain-classes/product";

export class SalesSummaryReportByClientInnerList{
    product:         IProduct;
    docDate:         Date;
    refInvDate:      Date;
    refInvNo:        string;
    docNo:           string;
    quantity:        number;
    unitPrice:       number;
    discountAmount:  number;
    grossAmount:     number;
    vatAmount:       number;
    amount:          number;
    itemTotalAmount: number;
}