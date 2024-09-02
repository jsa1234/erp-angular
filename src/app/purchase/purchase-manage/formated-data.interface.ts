import { ProductBarcode } from "@core/domain-classes/product-barcode.interface"
import { IPurchaseAddForm } from "@core/domain-classes/purchase-add-form.interface";
import { SelectedProductVariant } from "@core/domain-classes/selected-product-varints.interface"
import { v4 as uuid } from 'uuid';
import { PriceObject } from "./price.type";
import { PurchaseInvoiceDetail } from "@core/domain-classes/purchase-order/purchase-invoice-details";
import { TaxBehaviour } from "@core/domain-classes/enums/tax-behaviour.enum";
import { InvoiceType } from "@core/domain-classes/enums/invoice-type.enum";
import { Tax } from "@core/domain-classes/tax";
export class FormattedData{
    /**
     *
     */
    constructor(private dataFromBarcode?:ProductBarcode,private formValue?:IPurchaseAddForm, private priceObject?:PriceObject, private selectedVariants?:SelectedProductVariant[]) {
        
    }

    formatDataBarcode():PurchaseInvoiceDetail{

      const amount = this.dataFromBarcode.quantity *this.dataFromBarcode.unitPrice
      const taxableAmount = amount -  (this.dataFromBarcode?.discountAmount||0)
      let itemTotalAmount = 0
     let cgstAmount =0
     let sgstAmount = 0
     let igstAmount = 0
     let cessAmount = 0
     let addnlCessAmount = 0
     if(this.formValue.invoiceType == InvoiceType.B2B || this.formValue.invoiceType == InvoiceType.B2C){
       cgstAmount = taxableAmount *((this.dataFromBarcode.cgstRate || 0)  / 100)
       sgstAmount = taxableAmount *((this.dataFromBarcode.sgstRate || 0)  / 100)
       igstAmount = 0
      if(this.dataFromBarcode.cessObj.taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
        cessAmount = taxableAmount*((this.dataFromBarcode.cessRate )  / 100)
      }
      else{
        cessAmount = ((cgstAmount+sgstAmount) * ((this.dataFromBarcode.cessRate )  / 100))
      }
      if(this.dataFromBarcode.addnlCessObj.taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
        addnlCessAmount = taxableAmount*((this.dataFromBarcode.addnlCessRate )  / 100)
      }
      else{
        addnlCessAmount = ((cgstAmount+sgstAmount) * ((this.dataFromBarcode.addnlCessRate )  / 100))
      }
      itemTotalAmount = taxableAmount + cgstAmount+sgstAmount+cessAmount+addnlCessAmount
     }
     else{
      cgstAmount = 0
      sgstAmount = 0
      igstAmount = taxableAmount *((this.dataFromBarcode.igstRate ||0)  / 100)
     if(this.dataFromBarcode.cessObj.taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
       cessAmount = taxableAmount*((this.dataFromBarcode.cessRate ||0)  / 100)
     }
     else{
       cessAmount = (igstAmount * ((this.dataFromBarcode.cessRate ||0)  / 100))
     }

     if(this.dataFromBarcode.addnlCessObj.taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
      addnlCessAmount = taxableAmount*((this.dataFromBarcode.addnlCessRate )  / 100)
    }
    else{
      addnlCessAmount = (igstAmount * ((this.dataFromBarcode.addnlCessRate )  / 100))
    }
     itemTotalAmount = taxableAmount + igstAmount+cessAmount+addnlCessAmount
     }

        const format:PurchaseInvoiceDetail = {
            addnlCessAmount:addnlCessAmount,
            addnlCessRate:this.dataFromBarcode.addnlCessRate || 0,
            amount:amount ,
            branchUUID:'',     
            cessAmount:cessAmount,
            cessRate:this.dataFromBarcode.cessRate || 0,
            cgstAmount:cgstAmount,
            cgstRate: this.dataFromBarcode.cgstRate || 0,
            deviceUUID:'',      
            discountAmount: this.dataFromBarcode?.discountAmount,
            discountRate: this.dataFromBarcode?.discountRate,
            igstAmount: igstAmount,
            igstRate:this.dataFromBarcode.igstRate || 0,
            itemTotalAmount:itemTotalAmount,
            product:JSON.stringify(this.dataFromBarcode.product),         
            productPriceUUID: this.dataFromBarcode?.productPriceUUID, 
            productUUID: this.dataFromBarcode?.productUUID,
            purchaseInvoiceDetailUUID:uuid(),
            purchaseInvoiceUUID:this.formValue?.pruchaseInvoiceUUid,
            quantity: this.dataFromBarcode?.quantity,
            sgstAmount: sgstAmount,
            sgstRate:this.dataFromBarcode.sgstRate  || 0,
            unit:JSON.stringify(this.dataFromBarcode.unit),
            unitPrice: this.dataFromBarcode?.unitPrice, 
            unitUUID: this.dataFromBarcode?.unitUUID, 
            barcode: this.dataFromBarcode?.barcode,
            taxableAmount:taxableAmount,
            addnlCessObj:this.dataFromBarcode.addnlCessObj,
            cessObj:this.dataFromBarcode.cessObj,
            taxObj:this.dataFromBarcode.taxObj
        }

        return format
    }





    // formatData(): any {
    //     const formattedData = {
    //       PurchaseInvoiceUUID: this.formValue.pruchaseInvoiceUUid,
    //       AccountUUID: this.formValue.supplier,
    //       DocDate: this.formValue.invoiceDate,
    //       refBillNo: this.formValue.reffBillNo,
    //       RefInvoiceDate: this.formValue.refBillDate,
    //       DocNo: this.formValue.invoiceNo,
    //       TransactionMode:this.formValue.mode,
    //       SubTotal:this.priceObject.subTotal,
    //       DiscountAmount: this.priceObject.discountAmount,
    //       GrossAmount: this.priceObject.grossAmount,
    //       TaxAmount: this.priceObject.taxAmount,
    //       OtherExpense: this.priceObject.otherExpense,
    //       TransExpense: this.priceObject.transExpense,
    //       NetTotalAmount: this.priceObject.NetTotalAmount,
    //       RoundedNetTotalAmount: this.priceObject.RoundedNetTotalAmount,
    //       Remark:  this.formValue.remarks,
    //       IsComplete: true,
    //       Status: 1,
    //       PaymentRemark: '',
    //       BranchUUID:  this.formValue.branch,
    //       PurchaseInvoiceDetails: this.selectedVariants
    //     };
    
    //     return formattedData;
    //   }

      
}