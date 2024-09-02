import { IDamageEntryDetail } from "@core/domain-classes/damage-entry-details.interface";
import { DamageEntryForm } from "@core/domain-classes/damage-entry-form.interface";
import { ProductBarcode } from "@core/domain-classes/product-barcode.interface";
import { DamageEntryProductList } from "@core/domain-classes/damage-entry-product-list,interface";
import { IDamageEntry } from "@core/domain-classes/damage-entry.interface";
import { ProductPrice } from "@core/domain-classes/product";
import { SelectedProductVariant } from "@core/domain-classes/selected-product-varints.interface";

export class FormatDamageEntry{

    constructor(private formValue?:DamageEntryForm,private selectedVariants?:SelectedProductVariant[],private damageProductsList?:DamageEntryProductList[],private damageProductsEdit?:IDamageEntryDetail[],private grandTotal?:any,  private damageProductsBarcode?:ProductBarcode) {
        
    }
    formatData(): IDamageEntry {
        const formattedData = {
          damageUUID: this.formValue.damageUUID, 
          docNo: this.formValue.docNo, 
          docDate:this.formValue.docDate, 
          branchUUID: this.formValue.branchUUID, 
          deviceUUID: '', 
          documentUUID: '', 
          remarks: this.formValue.remarks, 
          netTotalAmount: this.grandTotal, 
          damageDetails: this.damageProductsList.map(variant => ({
            productUUID: variant.productUUID,
            productPriceUUID: variant.productPriceUUID,
            damageQuantity:variant.damageQuantity, 
            averageRate: variant.averageRate, 
            totalAmount: variant.totalAmount, 
            description: variant.description 
          }))
        };
    
        return formattedData;
      }

      formatDataForList():DamageEntryProductList[]{
        const formattedData = this.selectedVariants.map((variant, index) => ({
          productUUID: variant.productUUID,
          productPriceUUID: variant.productPriceUUID,
          damageQuantity:variant.damageQuantity, 
          averageRate: variant.unitPrice, 
          totalAmount: variant.damageAmount, 
          description: variant.description ,
          slNo: index+1,
          barcode: variant.barcode,
          productCode: variant.productCode,
          productNameEnglish: variant.productNameEnglish,
          productNameArabic: variant.productNameSecondLanguage,
          stock: 0,
          unitNameEnglish: variant.unitNameEnglish,
          unitNameSecondLanguage: variant.unitNameSecondLanguage,
        }))
        return formattedData
      }


      formatDataForEdit():DamageEntryProductList[]{
        const formattedData = this.damageProductsEdit.map((variant, index) => ({
          productUUID: variant.productUUID,
          productPriceUUID: variant.productPriceUUID,
          damageQuantity:variant.damageQuantity, 
          averageRate: variant.averageRate, 
          totalAmount: variant.totalAmount, 
          description: variant.description ,
          slNo: index+1,
          barcode: 'variant.productPrice?.barcode',
          productCode: variant.product.productCode,
          productNameEnglish: variant.product.nameEnglish,
          productNameArabic: variant.product.nameSecondLanguage,
          stock: 0,
          unitNameEnglish: variant.unit.nameEnglish,
          unitNameSecondLanguage: variant.unit.nameSecondLanguage,
        }))
        return formattedData
      }
      formatDataForBarcode():DamageEntryProductList{
        const formattedData = {
          productUUID: this.damageProductsBarcode?.productUUID,
          productPriceUUID: this.damageProductsBarcode?.productPriceUUID,
          damageQuantity:this.damageProductsBarcode?.quantity, 
          averageRate: this.damageProductsBarcode?.unitPrice, 
          totalAmount: (this.damageProductsBarcode?.quantity*this.damageProductsBarcode?.unitPrice)??0, 
          description: '' ,
          slNo: this.damageProductsList.length+1,
          barcode: this.damageProductsBarcode?.barcode,
          productCode: this.damageProductsBarcode?.product?.productCode,
          productNameEnglish: this.damageProductsBarcode?.product?.nameEnglish,
          productNameArabic: this.damageProductsBarcode?.product?.nameSecondLanguage,
          stock: 0,
          unitNameEnglish: this.damageProductsBarcode?.unit?.nameEnglish,
          unitNameSecondLanguage: this.damageProductsBarcode?.unit?.nameSecondLanguage,
        }
        return formattedData
      }
      
      
    }
