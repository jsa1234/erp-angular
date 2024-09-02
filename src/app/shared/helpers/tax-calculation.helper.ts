import { InvoiceType } from "@core/domain-classes/enums/invoice-type.enum"
import { TaxBehaviour } from "@core/domain-classes/enums/tax-behaviour.enum"

export function CalculateAmount(quantity:number,unitPrice:number):number{
    return quantity * unitPrice
}

export function CalculateTaxableAmount(amount:number,discountAmount:number):number{
    return amount - discountAmount||0
}

export function CalculateCgstAmount(taxableAmount:number,cgstRate:number,invoiceType:number,):number{
    let cgstAmount = 0 
    if(invoiceType == InvoiceType.B2B || invoiceType == InvoiceType.B2C){
        cgstAmount= taxableAmount *((cgstRate || 0)  / 100)
    }
    return cgstAmount
}
export function CalculateSgstAmount(taxableAmount:number,sgstRate:number,invoiceType:number):number{
    let sgstAmount = 0 
    if(invoiceType == InvoiceType.B2B || invoiceType == InvoiceType.B2C){
        sgstAmount= taxableAmount *((sgstRate || 0)  / 100)
    }
    return sgstAmount
}
export function CalculateIgstAmount(taxableAmount:number,igstRate:number,invoiceType:number):number{
    let igstAmount = 0 
    if(invoiceType == InvoiceType.B2BIS || invoiceType == InvoiceType.B2CIS){
        igstAmount= taxableAmount *((igstRate || 0)  / 100)
    }
    return igstAmount
}

export function CalculateCessAmount(invoiceType:number,taxBehaviour:TaxBehaviour,cessRate:number,taxableAmount:number,cgstAmount:number,sgstAmount:number,igstAmount:number):number{
    let cessAmount = 0 
    if(invoiceType == InvoiceType.B2B || invoiceType == InvoiceType.B2C){
        if(taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
            cessAmount = taxableAmount*((cessRate )  / 100)
          }
          else{
            cessAmount = ((cgstAmount+sgstAmount) * ((cessRate )  / 100))
          }
    }
    else{
        if(taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
            cessAmount = taxableAmount*((cessRate ||0)  / 100)
          }
          else{
            cessAmount = (igstAmount * ((cessRate ||0)  / 100))
          }
    }
    return cessAmount
}

export function CalculateAddnlCessAmount(invoiceType:number,taxBehaviour:TaxBehaviour,addnlcessRate:number,taxableAmount:number,cgstAmount:number,sgstAmount:number,igstAmount:number):number{
    let addnlCessAmount = 0 
    if(invoiceType == InvoiceType.B2B || invoiceType == InvoiceType.B2C){
        if(taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
            addnlCessAmount = taxableAmount*((addnlcessRate )  / 100)
          }
          else{
            addnlCessAmount = ((cgstAmount+sgstAmount) * ((addnlcessRate )  / 100))
          }
    }
    else{
        if(taxBehaviour == TaxBehaviour.TAXABLE_VALUE){
            addnlCessAmount = taxableAmount*((addnlcessRate ||0)  / 100)
          }
          else{
            addnlCessAmount = (igstAmount * ((addnlcessRate ||0)  / 100))
          }
    }
    return addnlCessAmount
}

export function CalculateItemTotalAmount(taxableAmount:number,cgstAmount:number,sgstAmount:number,igstAmount:number,cessAmount:number,addnlCessAmount:number,invoiceType:number):number{
    let itemTotalAmount = 0 
    if(invoiceType == InvoiceType.B2B || invoiceType == InvoiceType.B2C){
        itemTotalAmount = taxableAmount + cgstAmount+sgstAmount+cessAmount+addnlCessAmount
    }
    else{
        itemTotalAmount = taxableAmount + igstAmount+cessAmount+addnlCessAmount
    }
    return itemTotalAmount
}



