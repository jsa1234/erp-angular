import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { StockReportResourceParameter } from '@core/domain-classes/report-classes/stock-report/stock-report-resource-parameter';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { StockReportService } from '../stock-report.service';
import * as XLSX from 'xlsx';
import { StockItemReport } from '@core/domain-classes/report-classes/stock-report/stock-item-report';
import { StockItemReportList } from '@core/domain-classes/report-classes/stock-report/stock-item-report-list';
import { environment } from '@environments/environment';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';


@Component({
  selector: 'app-product-wise',
  templateUrl: './product-wise.component.html',
  styleUrls: ['./product-wise.component.scss']
})
export class ProductWiseComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  stockReportResource:StockReportResourceParameter
  stockitemWiseReport:StockItemReport
  stockItemList:StockItemReportList[]=[]
  productWiseReportPdf:StockItemReport

  categoryUUID: string = '';
  subcategoryUUID: string = '';
  brandUUID: string = '';
  branchUUID: any;

    constructor(private fb:FormBuilder,
      private stockReportService:StockReportService,
      private clonerService:ClonerService,
      public translationService: TranslationService,) {
super()
      }

    ngOnInit(): void {
      this.createSearchForm()
    }
    createSearchForm(){
      this.searchForm = this.fb.group({
        product:['',Validators.required],
        device:[''],
        branch:[''],
        toDate:['',Validators.required],
        fromDate:['',Validators.required],
        category:[''],
        subcategory:[''],
        brand:['']
      })
    }
    onSearch(){
      if( this.searchForm.invalid){
        this.searchForm.markAllAsTouched();
        return;
       }

       this.stockReportResource= this.searchForm.getRawValue()
       this.sub$.sink = this.stockReportService.getProductWiseReport(this.stockReportResource).subscribe((res:StockItemReport)=>{
        this.stockitemWiseReport = res
       this.stockItemList = this.stockitemWiseReport.stockItemReportList
       })
    }
    onClear(){
      this.resetForm();
      this.stockReportResource= this.searchForm.getRawValue()
      this.stockItemList=[]
      this.stockitemWiseReport = null

    }
  resetForm(){
    this.searchForm.patchValue({
      device:'',
      toDate:'',
      fromDate:'',
      category:'',
      subcategory:'',
      brand:'',
    })
  }
  parentCategoryHandlerFunction(valueEmitted){
    this.categoryUUID = valueEmitted;
}
  parentSubcategoryHandlerFunction(valueEmitted){
    this.subcategoryUUID = valueEmitted;
}
  parentBrandHandlerFunction(valueEmitted){
    this.brandUUID = valueEmitted;
}

onDownloadReport(){

  let stockReport = this.stockitemWiseReport.stockItemReportList
  let productWisestockReport = []
//   let heading=[[

//   'DATE','BILL NO','SUPPLIER','PURCHASE','','SALES','','PURCHASE RETURN','','SALES RETURN','','URATE','BALANCE'
// ],['', '', '','QTY', 'UNIT', 'QTY', 'UNIT', 'QTY', 'UNIT', 'QTY','UNIT','','']];


// stockReport.forEach((res: StockItemList)=>{
//   productWisestockReport.push({
//     'DATE':  res.transactionDate,
//     'BILL NO': res.documentNo,
//     'SUPPLIER': res.documentNo ,
//     'PURCHASE':{
//       'QTY': res.purchaseOuantity >0?res.purchaseOuantity:'',
//       'UNIT': res.purchaseOuantity > 0?res.unit.nameEnglish:''
//     },
//     'SALES':{
//       'QTY': res.saleQuantity >0?res.saleQuantity:'',
//       'UNIT': res.saleQuantity > 0?res.unit.nameEnglish:''
//     },
//     'PURCHASE RETURN': {
//       'QTY': res.purchaseReturnOuantity >0?res.purchaseReturnOuantity:'',
//       'UNIT': res.purchaseReturnOuantity > 0?res.unit.nameEnglish:''
//     },
//     'SALES RETURN': {
//       'QTY': res.saleReturnQuantity >0?res.saleReturnQuantity:'',
//       'UNIT': res.saleReturnQuantity > 0?res.unit.nameEnglish:''
//     },
//     'URATE':  res.rate,
//     'BALANCE': res.rate,

//   });
// });
let heading = [];

// Add the header row to the data array
heading.push([
  'DATE', 'BILL NO', 'SUPPLIER', 'PURCHASE', '', 'SALES', '', 'PURCHASE RETURN', '', 'SALES RETURN', '', 'URATE', 'BALANCE'
]);

// Add the units row to the data array
heading.push([
  '', '', '', 'QTY', 'UNIT', 'QTY', 'UNIT', 'QTY', 'UNIT', 'QTY', 'UNIT', '', ''
]);

// Iterate over the stockItemList array and add each row of data to the data array
this.stockItemList.forEach((item) => {
  heading.push([
    item.transactionDate,
    item.documentNo,
    item.documentNo,
    item.purchaseOuantity > 0 ? item.purchaseOuantity : '',
    item.purchaseOuantity > 0 ? item.unit.nameEnglish : '',
    item.saleQuantity > 0 ? item.saleQuantity : '',
    item.saleQuantity > 0 ? item.unit.nameEnglish : '',
    item.purchaseReturnOuantity > 0 ? item.purchaseReturnOuantity : '',
    item.purchaseReturnOuantity > 0 ? item.unit.nameEnglish : '',
    item.saleReturnQuantity > 0 ? item.saleReturnQuantity : '',
    item.saleReturnQuantity > 0 ? item.unit.nameEnglish : '',
    item.rate,
    item.balance
  ]);
});




    let workBook= XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workBook,heading);
    let workSheet= XLSX.utils.sheet_add_json(workBook, productWisestockReport, {origin: "A2", skipHeader:true });
    XLSX.utils.book_append_sheet(workBook,workSheet,"Product Wise Stock Report");
    XLSX.writeFile(workBook, "Product Wise Stock Report.xlsx");

}
generatePdf(){
  let report = this.clonerService.deepClone<StockItemReport>(this.stockitemWiseReport)
  this.productWiseReportPdf = report
}

parentBranchHandlerFunction(valueEmitted){
  this.branchUUID = valueEmitted;
  this.searchForm.patchValue({
    device:''
  })
}

generateExcel() {
  const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
  const excelName = `Produt Wise Stock Report_${new Date().getTime()}`
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const workbook: XLSX.WorkBook = { Sheets: { 'Produt Wise Stock Report': worksheet }, SheetNames: ['Produt Wise Stock Report'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  SaveAsExcelFile(excelBuffer, excelName);
  }
}
