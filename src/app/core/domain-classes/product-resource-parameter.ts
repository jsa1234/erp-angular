import { BranchType } from './enums/branch-type.enum';
import { ResourceParameter } from './resource-parameter';

export class ProductResourceParameter extends ResourceParameter {
  nameEnglish?=''
  nameSecondLanguage?=''
  category?=''
  subCategory?=''
  brand?=''
  partNo?=''
  productCode?=''
  categoryName?=''
  branchType?:BranchType
  productUUID?=''
}

