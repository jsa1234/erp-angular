import { CustomerAccount, ICustomerAccount } from './customer-account';
import { Employee } from './employee';
import { TransactionMode } from './enums/transaction-mode-enum';
import { SaleReturnDetail } from './sale-return-detail';

export class SalesReturn implements ISalesReturn {
  #_saleReturnUUID: string;
  #_clientObject: ICustomerAccount;
  #_docDate: Date;
  #_refInvDate: Date;
  #_docNo: string;
  #_refInvNo: string;
  #_transactionMode: number;
  #_discountAmount: number;
  #_taxAmount: number;
  #_netTotalAmount: number;
  #_transactionModeEnum = TransactionMode;
  #saleReturnDetails: SaleReturnDetail[];
  #_drNo:string
  #_poNo:string
  #_totalQuantity:number
  #_roundOff:number
#_subTotal:number
#_otherExpenses:number
#_transExpense:number
#_grossAmount:number
#_salesMan:Employee


  constructor(data: ISalesReturn) {
    this.#_saleReturnUUID = data?.saleReturnUUID;
    this.#_clientObject = data?.clientObject;
    this.#_docDate = data?.docDate;
    this.#_refInvDate = data?.refInvDate;
    this.#_docNo = data?.docNo;
    this.#_refInvNo = data?.refInvNo;
    this.#_transactionMode = data?.transactionMode;
    this.#_discountAmount = data?.discountAmount;
    this.#_taxAmount = data?.taxAmount;
    this.#_netTotalAmount = data?.netTotalAmount;
    this.#saleReturnDetails = data?.saleReturnDetails;
    this.#_poNo = data?.poNo
    this.#_drNo = data?.drNo
    this.#_totalQuantity = data?.totalQuantity
    this.#_roundOff = data?.roundOff
    this.#_subTotal = data?.subTotal
    this.#_otherExpenses = data?.otherExpense
    this.#_transExpense = data?.transExpense
    this.#_grossAmount = data?.grossAmount
    this.#_salesMan = data.salesMan
  }

  public get docDate(): Date {
    return this.#_docDate;
  }
  public get refInvDate(): Date {
    return this.#_refInvDate;
  }
  public get saleReturnUUID(): string {
    return this.#_saleReturnUUID;
  }
  public get docNo(): string {
    return this.#_docNo;
  }
  public get customerDetails(): CustomerAccount {
    return  new CustomerAccount(this.#_clientObject);
  }
  public get refInvNo(): string {
    return this.#_refInvNo;
  }
  public get transactionModeText(): string {
    return this.#_transactionModeEnum[this.#_transactionMode];
  }
  public get transactionMode(): number {
    return this.#_transactionMode;
  }
  public get totalDiscount(): number {
    return this.#_discountAmount;
  }
  public get totalTax(): number {
    return this.#_taxAmount;
  }
  public get totalAmount(): number {
    return this.#_netTotalAmount;
  }

  public get saleReturnDetails(): SaleReturnDetail[] {
    return this.#saleReturnDetails;
  }
  public get drNo(): string {
    return this.#_drNo;
  }
  public get poNo(): string {
    return this.#_poNo;
  }

  public get totalQuantity():number{
    return this.#_totalQuantity
  }
  public get subTotal():number{
    return this.#_subTotal
  }
  public get roundOff():number{
    return this.#_roundOff
  }

  public get totalTaxableAmount():number{
    return this.#_grossAmount
  }
  public get totalExpenses():number{
    return this.#_otherExpenses + this.#_transExpense
  }
  public get salesMan():Employee{
    return this.#_salesMan
  }
}

export interface ISalesReturn {
    account?:               string;
    accountUUID?:           string;
    branchId?:              number;
    branchUUID?:            string;
    clientObject?:          ICustomerAccount;
    createdBy?:             string;
    createdUser?:           any;
    deviceId?:              number;
    deviceUUID?:            string;
    discountAmount?:        number;
    docDate?:               Date;
    docNo?:                 string;
    documentId?:            number;
    documentUUID?:          string;
    grossAmount?:           number;
    isComplete?:            boolean;
    modifiedBy?:            string;
    netTotalAmount?:        number;
    otherExpense?:          number;
    refInvDate?:            Date;
    refInvNo?:              string;
    remark?:                null;
    remarks?:               string;
    roundednetTotalAmount?: number;
    roundOff?:              number;
    saleInvoiceId?:         number;
    saleInvoiceUUID?:       string;
    saleReturnDetails?:     SaleReturnDetail[];
    saleReturnId?:          number;
    saleReturnType?:        number;
    saleReturnUUID?:        string;
    status?:                number;
    subTotal?:              number;
    taxAmount?:             number;
    transactionMode?:       number;
    transExpense?:          number;
    poNo?:                  string;
    drNo?:                  string;
    totalQuantity?:         number;
    salesMan?:              Employee;
}
