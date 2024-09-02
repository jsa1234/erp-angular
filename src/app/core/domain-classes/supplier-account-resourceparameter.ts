import { ResourceParameter } from "./resource-parameter";

export class SupplierAccountResourceParameter extends ResourceParameter {
  accountUUID?: string;
  nameEnglish?: string = '';
  nameSecondLanguage?: string = '';
  mobileNo?: string = '';
  email?: string = '';
  website?: string = '';
  country?: string = '';
}
