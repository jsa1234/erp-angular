import { ICustomerAccount } from "@core/domain-classes/customer-account";
import { IProduct } from "@core/domain-classes/product";

export interface SaleReturnDetailedReportList {
    Account:         string;
    AccountUUID:     string;
    ClientObject:    ICustomerAccount;
    ProductObject:   IProduct;
    DocDate:         Date;
    RefInvDate:      Date;
    RefInvNo:        string;
    DocNo:           string;
    TransactionMode: string;
    Amount:          number;
    UnitPrice:       number;
    DiscountAmount:  number;
    GrossAmount:     number;
    CGSTRate:        number;
    SGSTRate:        number;
    IGSTRate:        number;
    CessRate:        number;
    quantity:        number;
    returnQuantity:  number;
    AddnlCessRate:   number;
    CGSTAmount:      number;
    SGSTAmount:      number;
    IGSTAmount:      number;
    CessAmount:      number;
    AddnlCessAmount: number;
    ItemTotalAmount: number;
}