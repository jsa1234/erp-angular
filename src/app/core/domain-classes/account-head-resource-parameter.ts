import { ResourceParameter } from './resource-parameter';

export class AccountHeadResourceParameter extends ResourceParameter {
  group?=''
  ledger?=''
  subledger?=''
  nameEnglish?=''
  nameSecondLanguage?=''
  accountCode? = ''
}
