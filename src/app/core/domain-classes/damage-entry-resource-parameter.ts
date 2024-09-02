import { ResourceParameter } from "./resource-parameter";

export class DamageEntryResourceParameter extends ResourceParameter {
    docNo?: string = '';
    docDate?: Date ;
    branchUUID?: string ='';
    deviceUUID?: string = '';
    fromDate?: Date;
    toDate?: Date;
}
