import { ResourceParameter } from "./resource-parameter";
export class SalesReturnResourceParameter extends ResourceParameter {
  invoiceNumber: string = '';
  branchUUID: string = ''
  deviceUUID: string = '';
  fromDate?: Date ;
  toDate?:Date ;
  invoiceDate:Date ;
}
