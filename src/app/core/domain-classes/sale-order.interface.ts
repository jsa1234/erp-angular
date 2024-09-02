import { SaleOrderDetail } from "./sale-order-detail.interface";
import { User } from "./user";

export interface ISaleOrder{
    saleOrderId?:           number;
    saleOrderUUID?:         string;
    account?:               string;
    clientObject?:          null;
    accountUUID?:           string;
    refInvNo?:              string;
    refInvDate?:            Date;
    docNo?:                 string;
    docDate?:               Date;
    transactionMode?:       number;
    saleType?:              number;
    billType?:              number;
    poNo?:                  string;
    drNo?:                  string;
    saleOrderDocNo?:        string;
    subTotal?:              number;
    discountAmount?:        number;
    grossAmount?:           number;
    cgstAmount?:            number;
    sgstAmount?:            number;
    igstAmount?:            number;
    cessAmount?:            number;
    addnlCessAmount?:       number;
    otherExpense?:          number;
    transExpense?:          number;
    netTotalAmount?:        number;
    roundedNetTotalAmount?: number;
    marginAmount?:          number;
    salesManUUID?:          null;
    salesMan?:              null;
    remarks?:               string;
    isComplete?:            boolean;
    status?:                number;
    remark?:                string;
    branchUUID?:            string;
    deviceUUID?:            string;
    qrCode?:                null;
    saleInvoiceType?:       number;
    invoiceType?:           number;
    saleSource?:            null;
    createdBy?:             string;
    modifiedBy?:            string;
    billDiscount?:          number;
    receivedCashAmount?:    number;
    receivedCardAmount?:    number;
    receivedUPIAmount?:     null;
    orderStatus?:           number;
    orderHistory?:          null;
    dateOfSupply?:          Date;
    createdUser?:           User;
    saleOrderDetails?:      SaleOrderDetail[];
    roundOff?:              number;
}


export class SaleOrder implements ISaleOrder{
}