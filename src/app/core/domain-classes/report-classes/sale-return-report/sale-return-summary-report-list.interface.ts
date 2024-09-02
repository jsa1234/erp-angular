import { ICustomerAccount } from "@core/domain-classes/customer-account";

export interface SaleReturnSummaryReportList {
    Account:               string;
    ClientObject:          ICustomerAccount;
    AccountUUID:           string;
    DocDate:               Date;
    RefInvDate:            Date;
    RefInvNo:              string;
    DocNo:                 string;
    TransactionMode:       string;
    SubTotal:              number;
    DiscountAmount:        number;
    GrossAmount:           number;
    CGSTAmount:            number;
    SGSTAmount:            number;
    IGSTAmount:            number;
    CessAmount:            number;
    AddnlCessAmount:       number;
    RoundednetTotalAmount: number;
}