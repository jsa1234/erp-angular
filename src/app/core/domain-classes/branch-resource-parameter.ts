import { BranchType } from './enums/branch-type.enum';
import { ResourceParameter } from './resource-parameter';

export class BranchResourceParameter extends ResourceParameter {
  branchUUID? = '';
  nameEnglish? = '';
  nameSecondLanguage? = '';
  financialYearUUID? = '';
  branchType?:number
}
