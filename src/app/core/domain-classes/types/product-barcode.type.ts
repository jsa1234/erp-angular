import { IBarcodeProfileConfigurations } from "../barcode-profile-configurations.interface";
import { IBarcodeProfile } from "../barcode-profile.interface";
import { ProductPrice } from "../product";
import { PurchaseInvoiceDetail } from "../purchase-order/purchase-invoice-details";

export type ProductBarcode = {
    barcodeProfile: IBarcodeProfile;
    configuration: IBarcodeProfileConfigurations;
    productVariant: ProductPrice | PurchaseInvoiceDetail; // Union type for productVariant
    quantity: number; // Make quantity optional
};
