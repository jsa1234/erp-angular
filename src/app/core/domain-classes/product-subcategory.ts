import { ProductCategory } from "./product-category";

export interface ProductSubcategory {
    subCategoryUUID:    string;
    categoryId:         number;
    categoryUUID:       string;
    nameEnglish:        string;
    nameSecondLanguage:         string;
    descriptionEnglish: string;
    descriptionSecondLanguage:  string;
    code:               string;
    branchId:           number;
    branchUUID:         string;
    syncFlag:           number;
    productCategory?:    ProductCategory;
    isUpdate?:    boolean
    allowZeroPrice?:    boolean
    allowNonStock?:    boolean
}