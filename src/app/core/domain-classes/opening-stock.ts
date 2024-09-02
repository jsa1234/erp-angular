import { Brand } from './brand';
import { ProductCategory } from './product-category';
import { ProductSubcategory } from './product-subcategory';

export class OpeningStock {
  productId: number;
  productUUID: string;
  productCode: string;
  nameEnglish: string;
  nameSecondLanguage: string;
  branchId: number;
  branchUUID: string;
  baseUnitNameEnglish: string;
  baseUnitNameArabic: string;
  openingStockProductDetails: OpeningStockProductDetail[];
  productCategory: ProductCategory;
  productSubCategory: ProductSubcategory;
  brand: Brand;

  public get stock() {
    let sum: number = 0;
    let qtyConversion = 1;
    let qty: number = 0;
    for (let i = 0; i < this.openingStockProductDetails.length; i++) {
      let baseQty =
        this.openingStockProductDetails[i].quantity *
        this.openingStockProductDetails[i].qtyConversion;
      sum += baseQty;
    }
    return sum;
  }
  constructor(value: OpeningStock) {
    this.productCode = value.productCode;
    this.productUUID = value.productUUID;
    this.productId = value.productId;
    this.nameEnglish = value.nameEnglish;
    this.nameSecondLanguage = value.nameSecondLanguage;
    this.baseUnitNameArabic = value.baseUnitNameArabic;
    this.baseUnitNameEnglish = value.baseUnitNameEnglish;
    this.openingStockProductDetails = value.openingStockProductDetails;
    this.productCategory = value.productCategory;
    this.productSubCategory = value.productSubCategory;
    this.brand = value.brand;
  }
}

export interface OpeningStockProductDetail {
  unitNameEnglish: string;
  unitNameArabic: string;
  unitLevel: number;
  qtyConversion: number;
  quantity: number;
  unitId: number;
  isBaseUnit: Boolean;
  unitUUID: string;
  barcode: string;
  productPriceId: number;
  productPriceUUID: string;
  ItemValue:number
}
