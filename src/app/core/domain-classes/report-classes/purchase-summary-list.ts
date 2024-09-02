import { Product } from "../product";
import { Supplier } from "../supplier";
import { ISupplierAccount } from "../supplierAccount";

export interface PurchaseSummaryList {
    discountAmount: number;
    docDate:    Date;
    docNo:  string;
    grossAmount:    number;
    itemTotal:      number;
    product:        Product;
    quantity:       number;
    refBillDate:    Date;
    refBillNo:  string;
    unitPrice:      number;
    account:string
    accountUUID:string
    roundedNetTotalAmount:number
    subTotal:number
    supplier:ISupplierAccount
    taxAmount:number
    transactionMode:string
    cgstAmount:            number;
    sgstAmount:            number;
    igstAmount:            number;
    cessAmount:            number;
    addnlCessAmount:       number;
}