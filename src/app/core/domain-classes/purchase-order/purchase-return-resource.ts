import { ResourceParameter } from '../resource-parameter';

export class PurchaseReturnResourceParameter extends ResourceParameter {
    invoiceNumber?: string = '';
    invoiceDate?: Date ;
    branchUUID?: string ='';
    deviceUUID?: string = '';
    fromDate?: Date;
    toDate?: Date;
    // status?: PurchaseOrderStatusEnum = PurchaseOrderStatusEnum.All;
}
