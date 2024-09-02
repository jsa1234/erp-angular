import { CustomerAccount, ICustomerAccount } from './customer-account';
import { TransactionMode } from "@core/domain-classes/enums/transaction-mode-enum";
import { SalesInvoiceDetails } from './sales-invoiceDetail';
import { Employee } from './employee';

export class SalesInvoice implements ISalesInvoice {
  
#_docDate:Date
#_docNo:string
#_saleInvoiceUUID:string
#_qrCode:string
#_drNo:string
#_poNo:string
#_totalTax:number
#_totalDiscount:number
#_totalAmount:number
#_otherExpenses:number
#_transExpense:number
#_saleInvoiceType:number
#_transactionMode:number
#_grossAmount:number
#_transactionModeEnum = TransactionMode
#_dateofSupply:Date
#_clientObject:ICustomerAccount
#_salesMan:Employee
#_totalQuantity:number

#_roundOff:number
#_subTotal:number
  #_branchUUID: string;

  constructor(values:ISalesInvoice) {
   this.#_docDate = values.docDate
   this.#_docNo = values.docNo
   this.#_totalTax = values.taxAmount
   this.#_totalDiscount = values.discountAmount
   this.#_totalAmount = values.netTotalAmount
   this.#_saleInvoiceUUID = values.saleInvoiceUUID
   this.#_clientObject = values.clientObject
   this.#_otherExpenses = values.otherExpense
   this.#_transExpense = values.transExpense
   this.#_transactionMode = values.transactionMode
   this.#_saleInvoiceType = values.saleInvoiceType
   this.#_poNo = values.poNo
   this.#_drNo = values.drNo
   this.#_qrCode = values.qrCode
   this.#_dateofSupply = values.dateOfSupply
   this.#_grossAmount = values.grossAmount
   this.#_salesMan = values.salesMan
   this.#_roundOff = values.roundOff
   this.#_totalQuantity = values.totalQuantity
   this.#_subTotal = values.subTotal
   this.#_branchUUID = values.branchUUID
  }

  public get saleInvoiceUUID(): string {
    return this.#_saleInvoiceUUID;
  }
  public get invoiceNumber():string{
    return this.#_docNo
  }
  public get invoiceDate():Date{
    return this.#_docDate
  }
  public get clientObject(): CustomerAccount {
    return new CustomerAccount(this.#_clientObject);
  }
  public get totalDiscount():number{
    return this.#_totalDiscount
  }
  public get totalTax():number{
    return this.#_totalTax
  }
  public get totalExpenses():number{
    return this.#_otherExpenses + this.#_transExpense
  }
  public get totalAmount():number{
    return this.#_totalAmount
  }
  public get saleInvoiceType():number{
    return this.#_saleInvoiceType
  }
  public get transactionModeText():string{
    return this.#_transactionModeEnum[this.#_transactionMode]
  }
  public get transactionMode():number{
    return this.#_transactionMode
  }

  public get qrCode(): string {
    return this.#_qrCode;
  }
  public get drNo(): string {
    return this.#_drNo;
  }
  public get poNo(): string {
    return this.#_poNo;
  }
  
  public get dateOfSupply():Date{
    return this.#_dateofSupply
  }
  public get totalTaxableAmount():number{
    return this.#_grossAmount
  }
  public get salesMan():Employee{
    return this.#_salesMan
  }
  public get roundOff():number{
    return this.#_roundOff
  }
  public get totalQuantity():number{
    return this.#_totalQuantity
  }
  public get subTotal():number{
    return this.#_subTotal
  }
  public get branchUUID():string{
    return this.#_branchUUID
  }

}

export interface ISalesInvoice{
  
    saleInvoiceId?:         number;
    saleInvoiceUUID?:       string;
    account?:               string;
    clientObject?:          ICustomerAccount;
    accountUUID?:           string;
    docDate?:               Date;
    refInvDate?:            Date;
    refInvNo?:              string;
    docNo?:                 string;
    transactionMode?:       number;
    saleType?:              number;
    billType?:              number;
    poNo?:                  string;
    drNo?:                  string;
    subTotal?:              number;
    discountAmount?:        number;
    grossAmount?:           number;
    taxAmount?:             number;
    otherExpense?:          number;
    transExpense?:          number;
    netTotalAmount?:        number;
    roundednetTotalAmount?: number;
    marginAmount?:          number;
    salesManId?:            number;
    salesManUUID?:          string;
    salesMan?:              Employee;
    remarks?:               string;
    isComplete?:            boolean;
    status?:                number;
    remark?:                string;
    createdBy?:             string;
    modifiedBy?:            string;
    branchId?:              number;
    branchUUID?:            string;
    deviceId?:              number;
    deviceUUID?:            string;
    saleInvoiceType?:       number;
    qrCode?:                string;
    roundOff?:              number;
    totalQuantity?:         number;
    dateOfSupply?:          Date;
    // createdUser?:           CreatedUser;
    saleInvoiceDetails?:    SalesInvoiceDetails[];
}
