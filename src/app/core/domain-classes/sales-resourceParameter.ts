import { ResourceParameter } from "./resource-parameter";
export class SalesInvoiceResourceParameter extends ResourceParameter {
  docNo: string = '';
  branchUUID: string = ''
  deviceUUID: string = '';
  fromDate?: Date ;
  toDate?:Date ;
  docDate:Date ;
}
