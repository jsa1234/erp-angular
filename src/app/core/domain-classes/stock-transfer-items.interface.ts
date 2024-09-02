import { IProduct, ProductPrice } from "./product";
import { Unit } from "./unit";

export interface IStockTransferItem{
    stockTransferDetailUUID: string;
    stockTransferDetailId:   number;
    stockTransferUUID:       string;
    productUUID:             string;
    productPriceUUID:        string;
    unitUUID:                string;
    quantity:                number;
    unitPrice:               number;
    netTotalAmount:          number;
    productJson:             string;
    productPriceJson:        string;
    unitJson:                string;
    unit:                    Unit;
    product:                 IProduct;
    productPrice:            ProductPrice;
}