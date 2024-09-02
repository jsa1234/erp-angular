import { IProduct, ProductPrice } from "./product";
import { Unit } from "./unit";

export interface IDamageEntryDetail {
    damageDetailUUID?: string;
    damageUUID?:       string;
    productUUID?:      string;
    productPriceUUID?: string;
    unitUUID?:         string;
    damageQuantity?:   number;
    quantity?:   number;
    averageRate?:      number;
    totalAmount?:      number;
    description?:      string;
    damageDetailId?:  number;
    unitJson?:         string;
    productJson?:      string;
    productPriceJson?: string;
    product?:          IProduct;
    unit?:             Unit;
    productPrice?:     ProductPrice[];
    barcode?:          string;
    stock?:            number
}
