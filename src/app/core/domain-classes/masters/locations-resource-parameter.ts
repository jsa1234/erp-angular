import { ResourceParameter } from "../resource-parameter";

export class LocationsResourceParameter extends ResourceParameter {
  nameEnglish? = '';
  nameSecondLanguage? = '';
  code? = '';
  isActive?: number;
  CountryCode?='';
  StateUUID?='';
  CountryUUID?='';
}