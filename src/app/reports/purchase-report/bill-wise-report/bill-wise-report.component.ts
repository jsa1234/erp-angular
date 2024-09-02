import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { BillWiseReport } from '@core/domain-classes/report-classes/bill-wise-report';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { PurchaseSummaryList } from '@core/domain-classes/report-classes/purchase-summary-list';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx';
import { PurchaseReportService } from '../purchase-report.service';
import { BillWisePurchaseReportTableColumns } from './bill-wise-purchase-report-table-columns';

@Component({
  selector: 'app-bill-wise-report',
  templateUrl: './bill-wise-report.component.html',
  styleUrls: ['./bill-wise-report.component.scss']
})
export class BillWiseReportComponent extends BaseComponent implements OnInit {
  showDocNo:boolean = true
  searchForm:FormGroup
  billWiseReportResource:ReportResourceParameter
  billWiseReport:BillWiseReport
  billWiseReportPdf:BillWiseReport
  purchaseSummaryList:PurchaseSummaryList[] =[]
  branchUUID: string;
  colspan: number;
  columnVisibility:ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = BillWisePurchaseReportTableColumns
  billWiseReportTableColumns: ColumnDisplaySettings[];
  constructor(private fb:FormBuilder,
    private purchaseReportService:PurchaseReportService,
    public translationService:TranslationService,
    private clonerService: ClonerService,
    private loader:LoaderService
    ) { 
    super()
    this.columns.forEach((column) => {
      this.columnVisibility[column.key] = column.visibleTableColumns; // Initialize visibility
    });
    this.colspan = this.columns.filter(column => column.visibleTableColumns).length
  }


  ngOnInit(): void {
    this.createSearchForm()
  }

  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:[''],
      device:[''],
      supplier:[''],
      accountUUID:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      mode:['']
    })
  }
  onSearch(){
    if( this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
     this.loader.show() 
     this.billWiseReportResource= this.searchForm.getRawValue()
     this.sub$.sink = this.purchaseReportService.gtBillWiseReport(this.billWiseReportResource).subscribe((res:BillWiseReport)=>{
      this.billWiseReport = res
     this.purchaseSummaryList = this.billWiseReport.purchaseSummaryList
     this.loader.hide()
     })
   }

  onClear(){
    this.resetForm();
    this.billWiseReportResource= this.searchForm.getRawValue()
    this.purchaseSummaryList=[]
    this.billWiseReport = null
  }

  resetForm(){
    this.searchForm.patchValue({
      device:'',
      fromDate:'',
      toDate:'',
      mode:'',
      accountUUID:''
    })
    this.searchForm.markAsUntouched()
  }

  generateExcel() {
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Bill Wise Purchase Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Bill Wise Purchase Report': worksheet }, SheetNames: ['Bill Wise Purchase Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
    }
  generatePdf(){
    let report = this.clonerService.deepClone<BillWiseReport>(this.billWiseReport)
    const tableColumns = this.clonerService.deepClone<ColumnDisplaySettings[]>(UpdateTableColumnVisibility(this.columns,this.columnVisibility))
    this.billWiseReportPdf = report
    this.billWiseReportTableColumns = tableColumns
  }

  parentBranchHandlerFunction(valueEmitted:string){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}



onCheckboxValueChanged(key: string, isChecked: boolean) {
  this.columnVisibility[key] = isChecked;
  this.colspan = Object.values(this.columnVisibility).filter(res =>res === true).length
}

}
