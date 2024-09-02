import { ColumnDisplaySettings } from "@core/domain-classes/column-display-settings";

export const DetailedPurchaseReportTableColumns: ColumnDisplaySettings[] = [
    {  key: '#', name:'Sl. No.', visibleTableColumns: true, isShowCheckBox: false },
    {  key: 'docNo', name:'Doc No', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'docDate', name:'Doc Date.', visibleTableColumns: true, isShowCheckBox: true },
    {  key: 'refBillNo', name:'Ref. Bill. No.', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'refBillDate', name:'Ref. Bill. Date', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productCode', name:'Product Code', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'productName', name:'Product Name', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'quantity', name:'Quantity', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'pRate', name:'Purchase Rate', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'supplierName', name:'Supplier Name', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'gstNo', name:'GST No', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'subTotal', name:'Sub Total', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'discount', name:'Discount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'taxableAmount', name:'Taxable Amount', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cgst', name:'CGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'sgst', name:'SGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'igst', name:'IGST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'totalGST', name:'Total GST', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'cess', name:'CESS', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'additionalCess', name:'Additional CESS', visibleTableColumns: false, isShowCheckBox: true },
    {  key: 'netTotal', name:'Net Total Amount', visibleTableColumns: true, isShowCheckBox: true }
  ];