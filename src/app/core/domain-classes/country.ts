export interface Country {
  countryUUID: string;
  countryCode: string;
  nameEnglish: string;
  nameSecondLanguage:  string;
  isActive:    boolean;
  isUpdate?:boolean
  selected?:boolean
  }
  