import { ColumnDisplaySettings } from "@core/domain-classes/column-display-settings";

export const PurchaseReturnTableColumns:ColumnDisplaySettings[] =  [
    {  key: '#', name:'Sl. No.', visibleTableColumns: true, isShowCheckBox: false },
    {  key: 'barcode', name:'Barcode', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productCode', name:'Product Code', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productName', name:'Product Name', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'unitName', name:'Unit Name', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'quantity', name:'Quantity', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'returnQuantity', name:'Return Quantity', visibleTableColumns: true, isShowCheckBox: false },
    {  key: 'unitPrice', name:'Unit Price', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'amount', name:'Amount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'discountPercentage', name:'Discount %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'discountAmount', name:'Discount Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'cgstPercentage', name:'CGST %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cgstAmount', name:'CGST Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'sgstPercentage', name:'SGST %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'sgstAmount', name:'SGST Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'igstPercentage', name:'IGST %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'igstAmount', name:'IGST Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'cessPercentage', name:'CESS %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cessAmount', name:'CESS Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'additionalCessPercentage', name:'Additional CESS %', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'additionalCessAmount', name:'Additional CESS Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'taxableAmount', name:'Taxable Amount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'manufactureDate', name:'Manufacture Date ', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'expiryDate', name:'Expiry Date', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'itemTotalAmount', name:'Item Total Amount', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'action', name:'', visibleTableColumns: true, isShowCheckBox: false }
]


