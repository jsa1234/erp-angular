import { ISupplierAccount } from "@core/domain-classes/supplierAccount";

export interface PurchaseReturnSummaryList {
    supplier:              ISupplierAccount;
    refInvDate:            Date;
    docDate:               Date;
    refInvNo:              string;
    docNo:                 string;
    transactionMode:       string;
    subTotal:              number;
    discountAmount:        number;
    grossAmount:           number;
    cgstAmount:            number;
    sgstAmount:            number;
    igstAmount:            number;
    cessAmount:            number;
    addnlCessAmount:       number;
    roundedNetTotalAmount: number;
}