import { Tax } from './tax';
import { Unit } from './unit';

// @Component({
//     template: ''
//   })
export class Product implements IProduct {
    #_productUUID: string;
    #_productCode: string;
    #_nameEnglish: string;
    #_nameSecondLanguage: string;
    #_category: string;
    #_subCategory: string;
    #_brand: string;
    #_partNo: string;
    #_productPrices: ProductPrice[];
    #_cessObj: Tax;
    #_taxObj: Tax;
    #_addnlCessObj: Tax;
    #_maxStockLevel: number;
    #_reorderLevel: number;
    #_imagePath:string;


    constructor(values:IProduct) {
        this.#_nameEnglish = values.nameEnglish;
        this.#_nameSecondLanguage = values.nameSecondLanguage;
        this.#_productUUID = values.productUUID;
        this.#_productCode = values.productCode;
        this.#_category = values.category;
        this.#_subCategory = values.subCategory;
        this.#_brand = values.brand;
        this.#_partNo = values.partNo
        this.#_productPrices=values.productPrices
        this.#_cessObj = values.cessObj
        this.#_taxObj = values.taxObj
        this.#_addnlCessObj = values.addnlCessObj
        this.#_maxStockLevel = values.maxStockLevel
        this.#_reorderLevel = values.reorderLevel
        this.#_imagePath = values.imagePath
    }
    nameCode?: string;
    productImage?: string;
    brandUUID: string;
    productCategoryUUID: string;
    productSubcategoryUUID: string;
    taxUUID: string;
    public get productUUID(): string {
        return this.#_productUUID;
    }
    public get productCode(): string {
        return this.#_productCode;
    }
    public get category(): string {
        let obj = JSON.parse(this.#_category);
        return  obj?.nameEnglish;
    }
    public get subCategory(): string {
        let obj = JSON.parse(this.#_subCategory);
        return obj?.nameEnglish; 
    }
    public get brand(): string {
        let obj = JSON.parse(this.#_brand);
        return obj?.nameEnglish;
    }
    public get categoryArabic(): string {
        let obj = JSON.parse(this.#_category);
        return  obj?.nameSecondLanguage;
    }
    public get subCategoryArabic(): string {
        let obj = JSON.parse(this.#_subCategory);
        return obj?.nameSecondLanguage; 
    }
    public get brandArabic(): string {
        let obj = JSON.parse(this.#_brand);
        return obj?.nameSecondLanguage;
    }

    public get nameEnglish(): string {
        return this.#_nameEnglish;
    }
    public get partNo(): string {
        return this.#_partNo;
    }
    public get nameSecondLanguage(): string {
        return this.#_nameSecondLanguage;
    }
    public get productPrices(): ProductPrice[] {
        return this.#_productPrices;
    }

    public get gstName():string{
        return this.#_taxObj?this.#_taxObj.nameEnglish:''
    }
    public get cessName():string{
        return this.#_cessObj?this.#_cessObj.nameEnglish:''
    }
    public get addnlCessName():string{
        return this.#_addnlCessObj?this.#_addnlCessObj.nameEnglish:''
    }
    public get maxStockLevel():number{
        return this.#_maxStockLevel
    }
    public get reorderLevel():number{
        return this.#_reorderLevel
    }
    public get imagePath():string{
        return this.#_imagePath
    }
    descriptionEnglish: string;
    descriptionArabic: string;
    hsnCode: string;
    tax: string;
    addnlCessUUID: string;
    cessUUID: string;
    margin: number;
    branchUUID: string;
    isImageUpdate?: boolean;
    isUpdate?: boolean = false;
}

export interface ProductPrice {
    key?: number;
    productPriceUUID?: string;
    barcode?: string;
    unitUUID?: string;
    unitLevel?: number;
    qtyConversion?: number;
    unitCost?: number;
    averageCost?: number;
    sellingPrice?: number;
    wholeSaleRate?: number;
    mrp?: number;
    nameEnglish?: string;
    nameSecondLanguage?: string;
    unit?:Unit
    isBaseUnit?:boolean
    isActive?:boolean
}
export interface IProduct {
    productId?:                 number;
    productUUID?:               string;
    productCode?:               string;
    nameEnglish?:               string;
    nameSecondLanguage?:        string;
    descriptionEnglish?:        string;
    descriptionSecondLanguage?: string;
    partNo?:                    string;
    hsnCode?:                   string;
    category?:                  string;
    subCategory?:               string;
    brand?:                     string;
    tax?:                       string;
    maxStockLevel?:             number;
    reorderLevel?:              number;
    margin?:                    number;
    imagePath?:                 string;
    productImage?:              string;
    isImageUpdate?:             boolean;
    branchId?:                  number;
    branchUUID?:                string;
    taxId?:                     number;
    taxUUID?:                   string;
    brandId?:                   number;
    brandUUID?:                 string;
    productCategoryId?:         number;
    productCategoryUUID?:       string;
    productSubcategoryId?:      number;
    productSubcategoryUUID?:    string;
    cgstRate?:                  number;
    sgstRate?:                  number;
    igstRate?:                  number;
    cessRate?:                  number;
    addnlCessRate?:             number;
    cessUUID?:                  string;
    addnlCessUUID?:             string;
    cess?:                      string;
    addnlCess?:                 string;
    taxObj?:                    Tax;
    cessObj?:                   Tax;
    addnlCessObj?:              Tax;
    productPrices?:             ProductPrice[];
    isUpdate?:                  boolean;
}
