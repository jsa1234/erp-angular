import { ResourceParameter } from './resource-parameter';

export class VoucherResourceParameter extends ResourceParameter {
    voucherDate?:Date
    fromDate?:Date
    toDate?:Date
    voucherNo?:string = ''
    branch?:string = ''
    device?:string = ''
}