import { ResourceParameter } from "./resource-parameter";

export class SaleOrderResourceParameter extends ResourceParameter {
  docNo?: string = '';
  branchUUID?: string = '';
  deviceUUID?: string = '';
  fromDate?: Date;
  toDate?: Date;
  docDate?: Date;
}