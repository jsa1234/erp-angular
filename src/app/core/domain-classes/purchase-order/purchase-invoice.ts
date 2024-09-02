import { CreatedUser, ICreatedUser } from '../created-user';
import { InvoiceType } from '../enums/invoice-type.enum';
import { TransactionMode } from '../enums/transaction-mode-enum';
import { ISupplierAccount, SupplierAccount } from '../supplierAccount';
import { PurchaseInvoiceDetail } from './purchase-invoice-details';

export interface IPurchaseInvoice {
  account?:                string;
  accountUUID?:            string;
  addnlCessAmount?:        number;
  branchUUID?:             string;
  cessAmount?:             number;
  cgstAmount?:             number;
  createdBy?:              string;
  deviceUUID?:             string;
  discountAmount?:         number;
  docDate?:                Date;
  docNo?:                  string;
  documentUUID?:           string;
  grossAmount?:            number;
  igstAmount?:             number;
  isComplete?:             boolean;
  netTotalAmount?:         number;
  otherExpense?:           number;
  paymentRemark?:          string;
  purchaseInvoiceDetails?: PurchaseInvoiceDetail[];
  purchaseInvoiceUUID?:    string;
  refBillDate?:            Date;
  refBillNo?:              string;
  remark?:                 string;
  roundedNetTotalAmount?:  number;
  roundOff?:               number;
  sgstAmount?:             number;
  status?:                 number;
  subTotal?:               number;
  transactionMode?:        number;
  transExpense?:           number;
  supplier?:               ISupplierAccount;
  createdUser?:            ICreatedUser;
  invoiceType?:            InvoiceType;
}

export class PurchaseInvoice implements IPurchaseInvoice{

#_docDate?:Date
#_docNo?:string
#_purchaseInvoiceUUID:string
#_purchaseInvoiceDetails:PurchaseInvoiceDetail[]
#_refBillDate: Date
#_refBillNo: string
#_transactionMode: number
#_modeEnum:typeof TransactionMode = TransactionMode
#_subTotal: number
#_discountAmount:  number
#_grossAmount: number
#_otherExpense:  number
#_transExpense:  number
#_netTotalAmount:  number
#_roundOff:  number
#_supplier: ISupplierAccount
#_createdUser: ICreatedUser
#_addnlCessAmount?:        number;
#_cessAmount?:             number;
#_cgstAmount?:             number;
#_sgstAmount?:             number;
#_igstAmount?:             number;
  #_remaks: string;
  #_branchUUID: string;


  constructor(data:IPurchaseInvoice) {
    this.#_docNo = data?.docNo
    this.#_docDate = data?.docDate
    this.#_purchaseInvoiceDetails = data?.purchaseInvoiceDetails
    this.#_transactionMode = data?.transactionMode
    this.#_refBillNo = data?.refBillNo
    this.#_refBillDate = data?.refBillDate
    this.#_subTotal = data?.subTotal
    this.#_discountAmount = data?.discountAmount
    this.#_grossAmount = data?.grossAmount
    this.#_otherExpense = data?.otherExpense
    this.#_transExpense = data?.transExpense
    this.#_netTotalAmount = data?.roundedNetTotalAmount
    this.#_roundOff = data?.roundOff
    this.#_addnlCessAmount = data?.addnlCessAmount
    this.#_cessAmount = data?.cessAmount
    this.#_cgstAmount = data?.cgstAmount
    this.#_igstAmount = data?.igstAmount
    this.#_sgstAmount = data?.sgstAmount
    this.#_supplier = data?.supplier
    this.#_purchaseInvoiceUUID = data?.purchaseInvoiceUUID
    this.#_createdUser = data?.createdUser
    this.#_remaks = data?.remark
    this.#_branchUUID = data?.branchUUID
   }

  public get purchaseInvoiceUUID():string{
    return this.#_purchaseInvoiceUUID
  }
  public get invoiceNumber():string{
    return this.#_docNo
  }
  public get remarks():string{
    return this.#_remaks
  }
  public get invoiceDate():Date{
    return this.#_docDate
  }
  public get purchaseInvoiceDetails():PurchaseInvoiceDetail[]{
    return this.#_purchaseInvoiceDetails
  }

  public get transactionModeText(): string {
    return this.#_modeEnum[this.#_transactionMode]
  }
  public get refBillNo():string{
    return this.#_refBillNo
  }
  public get refBillDate():Date{
    return this.#_refBillDate
  }
  public get subTotal():number{
    return this.#_subTotal
  }
  public get totalDiscount():number{
    return this.#_discountAmount
  }
  public get taxableAmount():number{
    return this.#_grossAmount
  }
  public get totalCgstAmount():number{
    return this.#_cgstAmount
  }
  public get totalIgstAmount():number{
    return this.#_igstAmount
  }
  public get totalSgstAmount():number{
    return this.#_sgstAmount
  }
  public get totalCessAmount():number{
    return this.#_cessAmount
  }
  public get totalAdnlCessAmount():number{
    return this.#_addnlCessAmount
  }

  public get totalExpenses():number{
    return (this.#_transExpense + this.#_otherExpense)
  }
  public get netTotal():number{
    return this.#_netTotalAmount
  }
  public get roundOff():number{
    return this.#_roundOff
  }
  public get supplier():SupplierAccount{
    return this.#_supplier? new SupplierAccount(this.#_supplier):null
  }
  public get createdUser():CreatedUser{
    return this.#_createdUser?new CreatedUser(this.#_createdUser):null
  }
  public get branchUUID():string{
    return this.#_branchUUID;
  }
}
