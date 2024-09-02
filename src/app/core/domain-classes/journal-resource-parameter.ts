import { ResourceParameter } from './resource-parameter';

export class JournalResourceParameter extends ResourceParameter {
    branch?:string = ''
    device?:string = ''
    journalNo?:string = ''
    fromDate?:Date
    toDate?:Date
    journalDate?:Date
}