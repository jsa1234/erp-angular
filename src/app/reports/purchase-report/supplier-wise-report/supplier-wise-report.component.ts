import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { PurchaseSummaryList } from '@core/domain-classes/report-classes/purchase-summary-list';
import { SupplierWiseReport } from '@core/domain-classes/report-classes/supplier-wise-report';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseReportService } from '../purchase-report.service';
import * as XLSX from 'xlsx';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { DatePipe } from '@angular/common';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { LoaderService } from '@shared/services/loader.service';
@Component({
  selector: 'app-supplier-wise-report',
  templateUrl: './supplier-wise-report.component.html',
  styleUrls: ['./supplier-wise-report.component.scss']
})
export class SupplierWiseReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  supplierWiseReportResource:ReportResourceParameter
  supplierWiseReport:SupplierWiseReport
  supplierWiseReportPdf:SupplierWiseReport
  purchaseSummaryList:PurchaseSummaryList[] = []
  branchUUID: any;
  constructor(private fb:FormBuilder,
    private purchaseReportService:PurchaseReportService,
    private clonerService:ClonerService,
    public translationService: TranslationService,
    private loader:LoaderService) {
    super();
  }

  ngOnInit(): void {
    this.createSearchForm()
  }
  createSearchForm(){
    this.searchForm = this.fb.group({
      supplier:['',Validators.required],
      device:[''],
      branch:[''],
      toDate:['',Validators.required],
      fromDate:['',Validators.required],
    })
  }
  onSearch(){
    if( this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
      this.supplierWiseReportResource= this.searchForm.value
      this.sub$.sink = this.purchaseReportService.gtSupplierWiseReport(this.supplierWiseReportResource).subscribe((res:SupplierWiseReport)=>{
       this.supplierWiseReport = res
      this.purchaseSummaryList = this.supplierWiseReport.purchaseSummaryList
      this.loader.hide()
      })
  }

  onClear(){
    this.resetForm();
    this.supplierWiseReportResource= this.searchForm.value
    this.purchaseSummaryList=[]
    this.supplierWiseReport=null
  }
  onDownloadReport(){

    let purchaseReport = this.supplierWiseReport.purchaseSummaryList
    const supplierWiseReport = this.supplierWiseReport
    let supplierWisePurchaseReport = []
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
    'REF. BILL NO','REF. BILL DATE','DOC NO','DOC DATE','ITEM','QTY','RATE','DISCOUNT','AMOUNT'
  ]];

  const customDatePipe = new CustomDatePipe(new DatePipe('en-US'));
  purchaseReport.forEach((res: PurchaseSummaryList)=>{
    supplierWisePurchaseReport.push({
        'REF. BILL NO':   res.refBillNo,
        'REF. BILL DATE': res.refBillDate?customDatePipe.transform(res.refBillDate):'',
        'DOC NO': res.docNo,
        'DOC DATE': customDatePipe.transform(res.docDate),
        'ITEM': this.translationService.getSelectedLanguage()=='en'?res.product.nameEnglish:res.product.nameSecondLanguage,
        'QTY':  res.quantity,
        'RATE': res.unitPrice,
        'DISCOUNT': res.discountAmount,
        'AMOUNT': res.itemTotal,
      });
  });
  supplierWisePurchaseReport.push({
    'REF. BILL NO':'',
    'REF. BILL DATE': '',
    'DOC NO':'' ,
    'DOC DATE': '',
    'ITEM': '',
    'QTY':  '',
    'RATE':'',
    'DISCOUNT':'',
    'AMOUNT':'',
  });
  supplierWisePurchaseReport.push({
    'REF. BILL NO':'Total',
    'REF. BILL DATE': '',
    'DOC NO':'' ,
    'DOC DATE': '',
    'ITEM': '',
    'QTY':  '',
    'RATE':'',
    'DISCOUNT':'',
    'AMOUNT':supplierWiseReport.totalAmount,
  });

  const totalLabelMergeCell = {
    s: { r: supplierWisePurchaseReport.length - 1, c: 0 }, // start cell
    e: { r: supplierWisePurchaseReport.length - 1, c: heading[0].length - 1 } // end cell
  };

  let workBook = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(workBook, [...heading, Object.values(supplierWisePurchaseReport[supplierWisePurchaseReport.length - 1])]);
  let workSheet = XLSX.utils.sheet_add_json(workBook, supplierWisePurchaseReport, { origin: "A2", skipHeader: true });

  // Apply the merged cell format
  workSheet['!merges'] = [totalLabelMergeCell];

  XLSX.utils.book_append_sheet(workBook, workSheet, "Supplier Wise Purchase Report");
  XLSX.writeFile(workBook, "Supplier Wise Purchase Report.xlsx");
  

  }
  resetForm(){
    this.searchForm.patchValue({
      supplier:'',
      device:'',
      fromDate:'',
      toDate:'',
      branch:''
    })
    this.searchForm.markAsUntouched()
  }

  generatePdf(){
    let report = this.clonerService.deepClone<SupplierWiseReport>(this.supplierWiseReport)
    this.supplierWiseReportPdf = report
  }
  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}
}
