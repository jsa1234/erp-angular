import { IProduct } from "../product"
import { Tax } from "../tax";
import { Unit } from "../unit"

export interface PurchaseReturnDetail {
purReturnDetailUUID?:string;
purchaseInvoiceDetailUUID?:string;
purchaseReturnUUID?:string;
productUUID?: string;
product?:string
productObject?:IProduct
unitObject?:Unit
productPriceUUID?:string;
productPrice?: string;
unitUUID?: string;
unit?: string;
quantity?: number;
returnQuantity?: number;
unitPrice?: number;
amount?:number;
discountRate?: number;
discountAmount?: number;
taxableAmount?: number;
vatRate?: number;
vatAmount?: number;
itemTotalAmount?: number;
branchUUID?: string
deviceUUID?: string
purInvoiceDetailUUID?: string;
cgstRate?:             number;
sgstRate?:             number;
igstRate?:             number;
cessRate?:             number;
addnlCessRate?:        number;
cgstAmount?:           number;
sgstAmount?:           number;
igstAmount?:           number;
cessAmount?:           number;
addnlCessAmount?:      number;
createdBy?:            string;
modifiedBy?:           string;
addnlCessObj?: Tax;
cessObj?: Tax;
taxObj?: Tax;

}
