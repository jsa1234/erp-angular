import { InvoiceType } from "@core/domain-classes/enums/invoice-type.enum";
import { TransactionMode } from "@core/domain-classes/enums/transaction-mode-enum";

export interface PurchaseForm {
  purchaseInvoiceUUID: string;
    invoiceType: InvoiceType;
    docNo: string;
    docDate: Date;
    refBillNo: string;
    refBillDate: Date;
    branchUUID: string;
    deviceUUID: string;
    accountUUID: string;
    transactionMode: TransactionMode;
  }