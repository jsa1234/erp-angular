import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { ProductWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/product-wise-sales-report';
import { SalesReportByLineItemList } from '@core/domain-classes/report-classes/sales-report/sales-report-by-line-item-list';
import { BaseComponent } from 'src/app/base.component';
import { SalesReportService } from '../sales-report.service';
import * as XLSX from 'xlsx';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { DatePipe } from '@angular/common';
import { environment } from '@environments/environment';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-product-wise-sales-report',
  templateUrl: './product-wise-sales-report.component.html',
  styleUrls: ['./product-wise-sales-report.component.scss']
})
export class ProductWiseSalesReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup

  productWiseReportResource:ReportResourceParameter
productWiseReport:ProductWiseSalesReport
purchaseItemList:SalesReportByLineItemList[]=[]
productWiseReportPdf:ProductWiseSalesReport
  categoryUUID: string = ''
  subcategoryUUID:string = ''
  brandUUID:string = ''
  branchUUID: any;
  constructor(private fb:FormBuilder,
    private salesReportService:SalesReportService,
    private clonerService:ClonerService,
    public translationService: TranslationService,
    private loader:LoaderService) {
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
      return;}
      this.loader.show()
      this.productWiseReportResource= this.searchForm.value
      this.sub$.sink = this.salesReportService.getProductWiseSalesReport(this.productWiseReportResource).subscribe((res:ProductWiseSalesReport)=>{
       this.productWiseReport = res
      this.purchaseItemList = this.productWiseReport.salesReportByLineItemList
      this.loader.hide()
      })
  }
  onClear(){
    this.resetForm();
    this.productWiseReportResource= this.searchForm.value
    this.purchaseItemList=[]
    this.productWiseReport = null
  
  }
resetForm(){
  this.searchForm.patchValue({
    device:'',
    toDate:'',
    fromDate:'',
    category:'',
    subcategory:'',
    brand:'',
    product:'',
    branch:''
  })
  this.searchForm.markAsUntouched()
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

  let purchaseReport = this.productWiseReport.salesReportByLineItemList
  const productWiseReport = this.productWiseReport
  let productWiseSaleReport = []
  let heading=[[
    'DOC NO', 'DOC DATE','CUSTOMER', 'MODE', 'QTY', 'RATE', 'SUB TOTAL', 'DISCOUNT', 'TAXABLE AMOUNT', 'VAT AMOUNT', 'NET TOTAL',
]];

const customDatePipe = new CustomDatePipe(new DatePipe('en-US'));
purchaseReport.forEach((res: SalesReportByLineItemList)=>{
  productWiseSaleReport.push({
      'DOC NO':   res.docNo,
      'DOC DATE':customDatePipe.transform(res.docDate) ,
      'CUSTOMER':  this.translationService.getSelectedLanguage()=='en'?res?.clientObject?.nameEnglish:res?.clientObject?.nameSecondLanguage,
      'MODE':  res.transactionModeText,
      'QTY': res.quantity,
      'RATE': res.unitPrice,
      'SUB TOTAL': res.subTotal,
      'DISCOUNT': res.discountAmount,
      'TAXABLE AMOUNT': res.grossAmount,
      'VAT AMOUNT': res.vatAmount,
      'NET TOTAL': res.itemTotalAmount,
    });
});

productWiseSaleReport.push({
  'DOC NO': '',
  'DOC DATE': '',
  'CUSTOMER': '',
  'MODE': '',
  'QTY': '',
  'RATE': '',
  'SUB TOTAL': '',
  'DISCOUNT': '',
  'TAXABLE AMOUNT': '',
  'VAT AMOUNT': '',
  'NET TOTAL': '' 
});

productWiseSaleReport.push({
  'DOC NO': 'TOTAL',
  'DOC DATE': '',
  'CUSTOMER': '',
  'MODE': '',
  'QTY': productWiseReport.totalQuantity,
  'RATE': productWiseReport.totalUnitPrice,
  'SUB TOTAL': productWiseReport.totalSubTotalAmount,
  'DISCOUNT': productWiseReport.totalDiscountAmount,
  'TAXABLE AMOUNT': productWiseReport.totalGrossAmount,
  'VAT AMOUNT': productWiseReport.totalVatAmount,
  'NET TOTAL': productWiseReport.totalNetItemTotalAmount 
});


    const totalLabelMergeCell = {
      s: { r: productWiseSaleReport.length - 1, c: 0 }, // start cell
      e: { r: productWiseSaleReport.length - 1, c: heading[0].length - 1 } // end cell
    };
  
    let workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workBook, [...heading, Object.values(productWiseSaleReport[productWiseSaleReport.length - 1])]);
    let workSheet = XLSX.utils.sheet_add_json(workBook, productWiseSaleReport, { origin: "A2", skipHeader: true });
  
    // Apply the merged cell format
    workSheet['!merges'] = [totalLabelMergeCell];
  
    XLSX.utils.book_append_sheet(workBook, workSheet, "Product Wise Sales Report");
    XLSX.writeFile(workBook, "Product Wise Sales Report.xlsx");

}
generatePdf(){
  let report = this.clonerService.deepClone<ProductWiseSalesReport>(this.productWiseReport)
  this.productWiseReportPdf = report
}

parentBranchHandlerFunction(valueEmitted){
  this.branchUUID = valueEmitted;
  this.searchForm.patchValue({
    device:''
  })
}
}
