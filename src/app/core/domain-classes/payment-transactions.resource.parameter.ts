import { ResourceParameter } from "./resource-parameter";

export class PaymentTransactionsResourceParameter extends ResourceParameter{
branchUUID?:string = '';
deviceUUID?:string = '';
fromDate?:Date;
toDate?:Date ;
transactionDate?:Date;
transactionNo?:string = '';
trasactionDocumentNo?:string = '';
transactionMode?:string = '';
transactionStatus?:string = '';
financialYearUUID?:string = '';
}