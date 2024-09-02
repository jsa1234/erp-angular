import { IProduct, ProductPrice } from '../product';
import { Tax } from '../tax';
import { Unit } from '../unit';

export interface PurchaseInvoiceDetail {
  addnlCess?: string;
  addnlCessAmount?: number;
  addnlCessObj?: Tax;
  addnlCessRate?: number;
  amount?: number;
  barcode?: string;
  branchUUID?: string;
  cess?: string;
  cessAmount?: number;
  cessObj?: Tax;
  cessRate?: number;
  cgstAmount?: number;
  cgstRate?: number;
  deviceUUID?: string;
  discountAmount?: number;
  discountRate?: number;
  igstAmount?: number;
  igstRate?: number;
  itemTotalAmount?: number;
  product?: string;
  productObject?: IProduct;
  productPrice?: string;
  productPriceUUID?: string;
  productUUID?: string;
  purchaseInvoiceDetailUUID?: string;
  purchaseInvoiceUUID?: string;
  quantity?: number;
  sgstAmount?: number;
  sgstRate?: number;
  tax?: string;
  taxObj?: Tax;
  unit?: string;
  unitObject?: Unit;
  unitPrice?: number;
  unitUUID?: string;
  taxableAmount?:number;
  taxUUID?:string
  cessUUID?:string
  addnlCessUUID?:string
  manufactureDate?:Date
  expiryDate?:Date
  priceUpdated?:boolean,
  unitCost?:number
  sellingPrice?:number
  wholeSaleRate?:number
  mrp?:number
}
