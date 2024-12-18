import { ColumnDisplaySettings } from "@core/domain-classes/column-display-settings";

export const DetailedSaleReturnReportTableColumns: ColumnDisplaySettings[] = [
    {  key: '#', name:'Sl. No.', visibleTableColumns: true, isShowCheckBox: false },
    {  key: 'docNo', name:'Invoice No', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'docDate', name:'Invoice Date', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'refInvNo', name:'Ref. Inv. No', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'refInvDate', name:'Ref. Inv. Date', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productCode', name:'Product Code', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productName', name:'Product Name', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'quantity', name:'Quantity', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'returnQuantity', name:'Return Quantity', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'rate', name:'Rate', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'customerName', name:'Customer Name', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'gstNo', name:'GST No', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'amount', name:'Sub Total', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'discount', name:'Discount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'amount', name:'Taxable Amount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cgst', name:'CGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'sgst', name:'SGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'igst', name:'IGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'totalGST', name:'Total GST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cess', name:'CESS', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'additionalCess', name:'Additional CESS', visibleTableColumns: false, isShowCheckBox: true },
    // {  key: 'transactionMode', name:'Transaction Mode', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'netTotal', name:'Net Total Amount', visibleTableColumns: true, isShowCheckBox: true }
  ];