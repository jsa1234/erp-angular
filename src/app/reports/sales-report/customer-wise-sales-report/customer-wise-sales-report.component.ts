import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms'
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { CustomerWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/customer-wise-sales-report';
import { SalesSummaryReportByClientInnerList } from '@core/domain-classes/report-classes/sales-report/sales-summary-report-by-client-inner-list'
import { SalesReportService } from '../sales-report.service';
import * as XLSX from 'xlsx'
import { BaseComponent } from 'src/app/base.component';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { DatePipe } from '@angular/common';
import { LoaderService } from '@shared/services/loader.service';
@Component({
  selector: 'app-customer-wise-sales-report',
  templateUrl: './customer-wise-sales-report.component.html',
  styleUrls: ['./customer-wise-sales-report.component.scss']
})
export class CustomerWiseSalesReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  customerWiseReportResource:ReportResourceParameter
  customerWiseReport:CustomerWiseSalesReport
  customerWiseReportPdf:CustomerWiseSalesReport
  purchaseSummaryList:SalesSummaryReportByClientInnerList[] = []
  branchUUID: any;
  constructor(private fb:FormBuilder,
    private salesReportService:SalesReportService,
    private clonerService:ClonerService,
    public translationService: TranslationService,private loader:LoaderService) {
      super()
     }

  ngOnInit(): void {
    this.createSearchForm()
  }
  createSearchForm(){
    this.searchForm = this.fb.group({
      customer:['',Validators.required],
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
      this.customerWiseReportResource= this.searchForm.value
      this.sub$.sink = this.salesReportService.getCustomerWiseSalesReport(this.customerWiseReportResource).subscribe((res:CustomerWiseSalesReport)=>{
       this.customerWiseReport = res
      this.purchaseSummaryList = this.customerWiseReport.salesSummaryReportByClientInnerList
      this.loader.hide()
      })
  }

  onClear(){
    this.resetForm();
    this.customerWiseReportResource= this.searchForm.value
    this.purchaseSummaryList=[]
    this.customerWiseReport = null
  }
  onDownloadReport(){

    let purchaseReport = this.customerWiseReport.salesSummaryReportByClientInnerList
    const customerWiseReport = this.customerWiseReport
    let customerWisePurchaseReport = []
    let heading=[[

    'DOC NO','DOC DATE','ITEMS','QTY','RATE','DISCOUNT','AMOUNT'
  ]];

  const customDatePipe = new CustomDatePipe(new DatePipe('en-US'));
  purchaseReport.forEach((res: SalesSummaryReportByClientInnerList)=>{
    customerWisePurchaseReport.push({
        'DOC NO':   res.docNo,
        'DOC DATE':customDatePipe.transform(res.docDate),
        'ITEMS':this.translationService.getSelectedLanguage()=='en'? res.product.nameEnglish:res.product.nameEnglish,
        'QTY':  res.quantity,
        'RATE': res.unitPrice,
        'DISCOUNT': res.discountAmount,
        'AMOUNT': res.itemTotalAmount,
      });
  });


      customerWisePurchaseReport.push({
        'DOC NO':'',
        'DOC DATE':'',
        'ITEMS':'',
        'QTY':'',
        'RATE':'',
        'DISCOUNT':'',
        'AMOUNT':'',
      });
      customerWisePurchaseReport.push({
        'DOC NO':'TOTAL',
        'DOC DATE':'',
        'ITEMS':'',
        'QTY':'',
        'RATE':'',
        'DISCOUNT':'',
        'AMOUNT':customerWiseReport.itemTotalAmount,
      });

    
      const totalLabelMergeCell = {
        s: { r: customerWisePurchaseReport.length - 1, c: 0 }, // start cell
        e: { r: customerWisePurchaseReport.length - 1, c: heading[0].length - 1 } // end cell
      };
    
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, [...heading, Object.values(customerWisePurchaseReport[customerWisePurchaseReport.length - 1])]);
      let workSheet = XLSX.utils.sheet_add_json(workBook, customerWisePurchaseReport, { origin: "A2", skipHeader: true });
    
      // Apply the merged cell format
      workSheet['!merges'] = [totalLabelMergeCell];
    
      XLSX.utils.book_append_sheet(workBook, workSheet, "Customer Wise Purchase Report");
      XLSX.writeFile(workBook, "Customer Wise Purchase Report.xlsx");

  }
  resetForm(){
    this.searchForm.patchValue({
      customer:'',
      device:'',
      fromDate:'',
      toDate:'',
      branch:''
    })
    this.searchForm.markAsUntouched()
  }

  generatePdf(){
    let report = this.clonerService.deepClone<CustomerWiseSalesReport>(this.customerWiseReport)
    this.customerWiseReportPdf = report
  }
  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
  }
}
