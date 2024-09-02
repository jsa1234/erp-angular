import { ISupplierAccount } from "../supplierAccount";
import { PurchaseSummaryList } from "./purchase-summary-list";

export interface SupplierWiseReport {
    fromDate:            Date;
    toDate:              Date;
    supplier:            ISupplierAccount;
    totalQuantity:       number;
    discountTotal:       number;
    grossAmountTotal:    number;
    totalAmount:         number;
    purchaseSummaryList: PurchaseSummaryList[];
}

