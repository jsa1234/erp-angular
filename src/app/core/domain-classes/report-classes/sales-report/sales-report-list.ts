import { ICustomerAccount } from "@core/domain-classes/customer-account";
import { TransactionMode } from "@core/domain-classes/enums/transaction-mode-enum";

export interface ISalesReportlist {
    docNo?: string;
    docDate?: Date;
    refInvNo?: string;
    refInvDate?: Date;
    account?: ICustomerAccount;
    accountUUID?: string;
    subTotal?: number;
    discountAmount?: number;
    grossAmount?: number;
    cgstAmount?: number;
    sgstAmount?: number;
    igstAmount?: number;
    cessAmount?: number;
    addnlCessAmount?: number;
    roundedNetTotalAmount?: number;
    transactionMode?: TransactionMode;
    transactionModeText?: string;
}
