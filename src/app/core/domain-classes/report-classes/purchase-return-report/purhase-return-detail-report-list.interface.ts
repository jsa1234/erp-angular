import { IProduct } from "@core/domain-classes/product";
import { ISupplierAccount } from "@core/domain-classes/supplierAccount";
import { Unit } from "@core/domain-classes/unit";

export interface PurchaseReturnDetailReportList{
    supplier:        ISupplierAccount;
    product:         IProduct;
    unit:            Unit;
    docDate:         Date;
    refInvDate:      Date;
    refInvNo:        string;
    docNo:           string;
    quantity:        number;
    returnQuantity:  number;
    unitPrice:       number;
    discountAmount:  number;
    grossAmount:     number;
    itemTotal:       number;
    cgstRate:        number;
    sgstRate:        number;
    igstRate:        number;
    cessRate:        number;
    addnlCessRate:   number;
    cgstAmount:      number;
    sgstAmount:      number;
    igstAmount:      number;
    cessAmount:      number;
    addnlCessAmount: number;
}