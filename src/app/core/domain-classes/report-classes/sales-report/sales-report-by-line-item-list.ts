import { ICustomerAccount } from "@core/domain-classes/customer-account";

export interface SalesReportByLineItemList{
    account:             null;
    accountUUID:         string;
    clientObject:        ICustomerAccount;
    docDate:             Date;
    refInvDate:          Date;
    refInvNo:            string;
    docNo:               string;
    transactionMode:     number;
    transactionModeText: string;
    subTotal:            number;
    unitPrice:           number;
    quantity:            number;
    discountAmount:      number;
    grossAmount:         number;
    vatAmount:           number;
    itemTotalAmount:     number;
}