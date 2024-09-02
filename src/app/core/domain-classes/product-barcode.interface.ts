import { IProduct } from "./product";
import { Tax } from "./tax";
import { Unit } from "./unit";

export interface ProductBarcode {
    product:          IProduct;
    barcode:          string;
    productUUID:      string;
    productPriceUUID: string;
    unitUUID:         string;
    quantity:         number;
    unitPrice:        number;
    amount:           number;
    discountRate:     number;
    discountAmount:   number;
    cgstRate:         number;
    sgstRate:         number;
    igstRate:         number;
    cessRate:         number;
    addnlCessRate:    number;
    itemTotalAmount:  number;
    unit:             Unit;
    tax:              string;
    cess:             string;
    addnlCess:        string;
    taxObj:           Tax;
    cessObj:          Tax;
    addnlCessObj:     Tax;
    manufactureDate?:Date
    expiryDate?:Date
    productObject?:    IProduct;
    category?:       string;
    subCatgory?:     string;          
    brand?:     string;
    mrp?:   number          
}