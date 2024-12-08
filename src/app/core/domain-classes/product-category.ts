export class ProductCategory {
    categoryUUID:       string;
    nameEnglish:        string;
    nameSecondLanguage:         string;
    descriptionEnglish: string;
    descriptionSecondLanguage:  string;
    code:               string;
    branchUUID:         string;
    syncFlag:           number;
    isActive:           boolean
    isUpdate?:           boolean
    allowNonStock:           boolean
    allowZeroPrice?:           boolean
    isTop?:                boolean
}