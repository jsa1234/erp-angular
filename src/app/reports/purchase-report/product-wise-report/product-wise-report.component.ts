import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductWiseReport } from '@core/domain-classes/report-classes/product-wise-report';
import { PurchaseItemList } from '@core/domain-classes/report-classes/purchase-item-list';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseReportService } from '../purchase-report.service';
import * as XLSX from 'xlsx';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { DatePipe } from '@angular/common';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-product-wise-report',
  templateUrl: './product-wise-report.component.html',
  styleUrls: ['./product-wise-report.component.scss']
})
export class ProductWiseReportComponent extends BaseComponent implements OnInit {
searchForm:FormGroup
productWiseReportResource:ReportResourceParameter
productWiseReport:IProductWiseReport
purchaseItemList:PurchaseItemList[]=[]
productWiseReportPdf:IProductWiseReport

categoryUUID: string = '';
subcategoryUUID: string = '';
brandUUID: string = '';
  branchUUID: any;

  constructor(private fb:FormBuilder,
    private purchaseReportService:PurchaseReportService,
    private clonerService:ClonerService,
    public translate: TranslationService,
    private loader:LoaderService
  ) { 
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
    this.loader.show()
      this.productWiseReportResource= this.searchForm.value
      this.sub$.sink = this.purchaseReportService.getProductWiseReport(this.productWiseReportResource).subscribe((res:IProductWiseReport)=>{
       this.productWiseReport = res
      this.purchaseItemList = this.productWiseReport.purchaseItemList
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

  let purchaseReport = this.productWiseReport.purchaseItemList
  const productWiseReport = this.productWiseReport
  let productWisePurchaseReport = []
  let heading=[[
  // this.translationService.getValue('BILL NO'),
  // this.translationService.getValue('BILL DATE'),
  // this.translationService.getValue('Invoice'),
  // this.translationService.getValue('SUPPLIER'),
  // this.translationService.getValue('PRODUCT NAME'),
  // this.translationService.getValue('QUANTITY'),
  // this.translationService.getValue('UNIT'),
  // this.translationService.getValue('UNIT PRICE'),
  // this.translationService.getValue('VAT AMOUNT'),
  // this.translationService.getValue('AMOUNT'),
  'REF. BILL NO', 'REF. BILL DATE', 'DOC NO', 'DOC DATE', 'SUPPLIER',' MODE', 'QTY', 'RATE', 'SUB TOTAL', 'DISCOUNT', 'TAXABLE AMOUNT', 'VAT AMOUNT', 'NET TOTAL'
]];
const customDatePipe = new CustomDatePipe(new DatePipe('en-US'));

purchaseReport.forEach((res: PurchaseItemList)=>{
  productWisePurchaseReport.push({
      'REF. BILL NO':   res.refBillNo,
      'REF. BILL DATE':res.refBillDate?customDatePipe.transform(res.refBillDate) :'',
      'DOC NO': res.docNo,
      'DOC DATE': customDatePipe.transform(res.docDate) ,
      'SUPPLIER':this.translate.getSelectedLanguage()=='en'?  res.supplier.nameEnglish:res.supplier.nameSecondLanguage,
      'MODE':  res.modeText,
      'QTY': res.quantity,
      'RATE':  res.unitPrice,
      'SUB TOTAL':  res.subTotal,
      'DISCOUNT': res.discountAmount,
      'TAXABLE AMOUNT': res.grossAmount,
      'VAT AMOUNT': res.vatAmount,
      'NET TOTAL': res.itemTotal,
    });
});

    productWisePurchaseReport.push({
      'REF. BILL NO': '',
      'REF. BILL DATE': '',
      'DOC NO': '',
      'DOC DATE': '',
      'SUPPLIER': '',
      'MODE': '',
      'QTY': '',
      'RATE': '',
      'SUB TOTAL': '',
      'DISCOUNT': '',
      'TAXABLE AMOUNT': '',
      'VAT AMOUNT': '',
      'NET TOTAL': '' 
    });

    productWisePurchaseReport.push({
      'REF. BILL NO': 'Total',
      'REF. BILL DATE': '',
      'DOC NO': '',
      'DOC DATE': '',
      'SUPPLIER': '',
      'MODE': '',
      'QTY': productWiseReport.totalQuantity,
      'RATE': productWiseReport.totalUnitRate,
      'SUB TOTAL': productWiseReport.totalSubTotalAmount,
      'DISCOUNT': productWiseReport.totalDiscount,
      'TAXABLE AMOUNT': productWiseReport.totalGrossAmount,
      'VAT AMOUNT': productWiseReport.totalVatAmount,
      'NET TOTAL': productWiseReport.totalAmount 
    });
  
    const totalLabelMergeCell = {
      s: { r: productWisePurchaseReport.length - 1, c: 0 }, // start cell
      e: { r: productWisePurchaseReport.length - 1, c: heading[0].length - 1 } // end cell
    };
  
    let workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workBook, [...heading, Object.values(productWisePurchaseReport[productWisePurchaseReport.length - 1])]);
    let workSheet = XLSX.utils.sheet_add_json(workBook, productWisePurchaseReport, { origin: "A2", skipHeader: true });
  
    // Apply the merged cell format
    workSheet['!merges'] = [totalLabelMergeCell];
  
    XLSX.utils.book_append_sheet(workBook, workSheet, "Product Wise Purchase Report");
    XLSX.writeFile(workBook, "Product Wise Purchase Report.xlsx");

}
generatePdf(){
  let report = this.clonerService.deepClone<IProductWiseReport>(this.productWiseReport)
  this.productWiseReportPdf = report
}


parentBranchHandlerFunction(valueEmitted){
  this.branchUUID = valueEmitted;
  this.searchForm.patchValue({
    device:''
  })
}
}
