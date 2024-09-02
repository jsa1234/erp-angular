import { CreatedUser, ICreatedUser } from '../created-user';
import { TransactionMode } from '../enums/transaction-mode-enum';
import { ISupplierAccount, SupplierAccount } from '../supplierAccount';
import { PurchaseReturnDetail } from './purchase-return-details';

export interface IPurchaseReturn {
    purchaseReturnUUID?:    string;
    purchaseInvoiceUUID?:   string;
    account?:               string;
    accountUUID?:           string;
    supplier?:              ISupplierAccount;
    docDate?:               Date;
    refInvNo?:              string;
    docNo?:                 string;
    refInvDate?:            Date;
    transactionMode?:       number;
    subTotal?:              number;
    discountAmount?:        number;
    grossAmount?:           number;
    taxAmount?:             number;
    otherExpense?:          number;
    transExpense?:          number;
    netTotalAmount?:        number;
    roundNetTotalAmount?:   number;
    remarks?:               string;
    isComplete?:            boolean;
    status?:                number;
    roundOff?:              number;
    createdBy?:             string;
    modifiedBy?:            string;
    branchUUID?:            string;
    documentUUID?:          string;
    deviceUUID?:            string;
    createdUser?:           ICreatedUser;
    purchaseReturnDetails?: PurchaseReturnDetail[];
    cgstAmount?:            number;
    sgstAmount?:            number;
    igstAmount?:            number;
    cessAmount?:            number;
    addnlCessAmount?:       number;
    invoiceType?:           number;
}
export class PurchaseReturn implements IPurchaseReturn{
    #_supplier: ISupplierAccount;
    #_docDate: Date;
    #_refInvDate: Date;
    #_docNo: string;
    #_purchaseReturnUUID: string;
    #_branchUUID: string;
    #_refInvNo: string;
    #_transactionMode: number;
    #_subTotal: number;
    #_discountAmount: number;
    #_grossAmount: number;
    #_taxAmount: number;
    #_otherExpense: number;
    #_transExpense: number;
    #_roundOff: number;
    #_netTotalAmount: number;
    #_modeEnum = TransactionMode
    #_purchaseReturnDetails: PurchaseReturnDetail[]
    #_createdUser: ICreatedUser
    constructor(value:IPurchaseReturn) {
        this.#_supplier = value.supplier
        this.#_docDate = value.docDate
        this.#_refInvDate = value.refInvDate
        this.#_docNo = value.docNo
        this.#_refInvNo = value.refInvNo
        this.#_transactionMode = value.transactionMode
        this.#_subTotal =  value.subTotal    
        this.#_discountAmount = value.discountAmount
        this.#_grossAmount = value.grossAmount
        this.#_taxAmount =  value.taxAmount
        this.#_purchaseReturnUUID =  value.purchaseReturnUUID
        this.#_netTotalAmount =  value.netTotalAmount
        this.#_otherExpense =  value.otherExpense
        this.#_transExpense =  value.transExpense
        this.#_purchaseReturnDetails=value.purchaseReturnDetails 
        this.#_roundOff=value.roundOff 
        this.#_createdUser=value.createdUser 
        this.#_branchUUID=value.branchUUID 
    }
    public get purchaseReturnUUID(): string {
        return this.  #_purchaseReturnUUID;
    }
    public get branchUUID(): string {
        return this.  #_branchUUID;
    }
    public get invoiceNumber(): string {
        return this.  #_docNo;
    }
    public get invoiceDate(): Date {
        return this.  #_docDate;
    }
    public get purchaseReturnDetails(): PurchaseReturnDetail[] {
        return this.  #_purchaseReturnDetails;
    }
    public get transactionModeText(): string {
        return this.#_modeEnum[this.#_transactionMode]
    }
    public get refInvNo(): string {
        return this.  #_refInvNo;
    }
    public get refInvDate(): Date {
        return this.  #_refInvDate;
    }
    public get subTotal(): number {
        return this.#_subTotal
    }
    public get totalDiscount(): number {
        return this.#_discountAmount
    }
    public get taxableAmount(): number {
        return this.#_grossAmount
    }
    public get totalVat(): number {
        return this.#_taxAmount
    }

    public get totalExpenses():number{
        return (this.#_transExpense + this.#_otherExpense)
      }
      public get netTotal():number{
          return this.#_netTotalAmount
        }

    public get supplier(): SupplierAccount {
        return this.#_supplier? new SupplierAccount(this.#_supplier):null
    }
    public get createdUser(): CreatedUser {
        return this.#_createdUser? new CreatedUser(this.#_createdUser):null
    }
    public get roundOff():number{
        return this.#_roundOff
    }
}
