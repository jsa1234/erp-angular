import { Product } from "./product"
import { Unit } from "./unit"

export interface SalesInvoiceDetails {
    saleInvoiceDetailUUID :string
    saleInvoiceUUID:string
    product? :string
    productObject?:Product
    unitObject?:Unit
    unit?:string
    branchUUID :string
    quantity :number
    unitPrice :number
    amount :number
    discountRate :number
    discountAmount :number
    vatAmount :number
    vatRate :number
    itemTotalAmount :number
    deviceUUID?:string
    }