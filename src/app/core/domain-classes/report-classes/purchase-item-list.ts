import { IProduct } from "../product";
import { ISupplierAccount } from "../supplierAccount";
import { Unit } from "../unit";

export interface PurchaseItemList {
    addnlCessAmount: number;
    addnlCessRate:   number;
    cessAmount:      number;
    cessRate:        number;
    cgstAmount:      number;
    cgstRate:        number;
    discountAmount: number;
    docDate:        Date;
    docNo:          string;
    grossAmount:    number;
    igstAmount:      number;
    igstRate:        number;
    itemTotal:      number;
    mode:           number;
    modeText:       string;
    product:        IProduct;
    quantity:       number;
    refBillDate:    Date;
    refBillNo:      string;
    sgstAmount:      number;
    sgstRate:        number;
    subTotal:       number;
    supplier:       ISupplierAccount;
    unit:           Unit;
    unitPrice:      number;
    vatAmount:      number;
}

