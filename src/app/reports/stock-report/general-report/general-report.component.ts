import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralStockReport } from '@core/domain-classes/report-classes/stock-report/general-report';
import { StockGeneralReportList } from '@core/domain-classes/report-classes/stock-report/general-stock-report';
import { StockReportResourceParameter } from '@core/domain-classes/report-classes/stock-report/stock-report-resource-parameter';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx';
import { StockReportService } from '../stock-report.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss']
})
export class GeneralReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  stockReportResource:StockReportResourceParameter
  generalReport:GeneralStockReport
  generalStockReportList:StockGeneralReportList[] =[]
  generalReportPdf:GeneralStockReport
  branchUUID: any;
  constructor(private fb:FormBuilder,
    private stockReportService:StockReportService,
    public translationService:TranslationService,
    private clonerService:ClonerService) {
super()
  }



  ngOnInit(): void {
    this.createSearchForm()
  }

  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:[''],
      device:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required]
    })
  }

  onSearch(){
    if( this.searchForm.valid){
     this.stockReportResource= this.searchForm.getRawValue()
    this.sub$.sink = this.stockReportService.getGeneralReport(this.stockReportResource).subscribe((res:GeneralStockReport)=>{
      this.generalReport = res
     this.generalStockReportList = this.generalReport.stockGeneralReportList
     })
    }
    else{
      this.searchForm.markAllAsTouched();
     }
   }

   onClear(){
    this.resetForm();
    this.stockReportResource= this.searchForm.getRawValue()
    this.generalStockReportList=[]
  }

  resetForm(){
    this.searchForm.patchValue({
      device:'',
      fromDate:'',
      toDate:'',
    })
    this.searchForm.markAsUntouched()
  }

  onDownloadReport(){
    let stockReport = this.generalReport.stockGeneralReportList
    let generalstockReport = []
    let heading=[[

    'SI.NO','PRODUCT ID','ITEM NAME','OPENING STOCK','OPENING STOCK VALUE','CURRENT STOCK','CURRENT STOCK COST','STOCK VALUE'
  ]];


  stockReport.forEach((res:StockGeneralReportList )=>{
    generalstockReport.push({
        'SI.NO':   1,
        'PRODUCT ID': res.product.productCode,
        'ITEM NAME': res.product.nameEnglish,
        'OPENING STOCK':  res.openingStockQuantity,
        'OPENING STOCK VALUE': res.openingStockValue,
        'CURRENT STOCK':  res.currentStock,
        'CURRENT STOCK COST': res.currentCost,
        'STOCK VALUE': res.stockValue,

      });
  });




      let workBook= XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook,heading);
      let workSheet= XLSX.utils.sheet_add_json(workBook, generalstockReport, {origin: "A2", skipHeader:true });
      XLSX.utils.book_append_sheet(workBook,workSheet,"General Stock Report");
      XLSX.writeFile(workBook, "General Stock Report.xlsx");

  }

  generatePdf(){
    let report = this.clonerService.deepClone<GeneralStockReport>(this.generalReport)
    this.generalReportPdf = report
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
  }
}
