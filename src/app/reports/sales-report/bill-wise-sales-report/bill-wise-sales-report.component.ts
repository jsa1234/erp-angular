import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { BillWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/bill-wise-sales-report';
import { ISalesReportlist } from '@core/domain-classes/report-classes/sales-report/sales-report-list';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx';
import { SalesReportService } from '../sales-report.service';
import { BillWiseSaleReportTableColumns } from './bill-wise-sale-report-table-columns';

@Component({
  selector: 'app-bill-wise-sales-report',
  templateUrl: './bill-wise-sales-report.component.html',
  styleUrls: ['./bill-wise-sales-report.component.scss']
})
export class BillWiseSalesReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  billWiseReportResource:ReportResourceParameter
  billWiseReport:BillWiseSalesReport
  billWiseReportPdf:BillWiseSalesReport
  purchaseSummaryList:ISalesReportlist[] =[]
  branchUUID: string;
  colspan: number;
  columnVisibility:ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = BillWiseSaleReportTableColumns
  billWiseReportTableColumns: ColumnDisplaySettings[];
  constructor
    (private fb:FormBuilder,
      private salesReportService:SalesReportService,
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
      customer:[''],
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
     this.sub$.sink = this.salesReportService.getBillWiseSalesReport(this.billWiseReportResource).subscribe((res:BillWiseSalesReport)=>{
      this.billWiseReport = res
      this.purchaseSummaryList= this.billWiseReport.salesReportlists
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
      customer:''
    })
    this.searchForm.markAsUntouched()
  }

  onDownloadReport(){
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Bill Wise Sale Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Bill Wise Sale Report': worksheet }, SheetNames: ['Bill Wise Sale Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
  }

  generatePdf(){
    let report = this.clonerService.deepClone<BillWiseSalesReport>(this.billWiseReport)
    const tableColumns = this.clonerService.deepClone<ColumnDisplaySettings[]>(UpdateTableColumnVisibility(this.columns,this.columnVisibility))
    this.billWiseReportPdf = report
    this.billWiseReportTableColumns = tableColumns

  }

  parentBranchHandlerFunction(valueEmitted){
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
