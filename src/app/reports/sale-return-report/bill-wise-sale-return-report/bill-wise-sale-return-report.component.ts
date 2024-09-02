import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { SaleReturnSummaryReportList } from '@core/domain-classes/report-classes/sale-return-report/sale-return-summary-report-list.interface';
import { SaleReturnSummaryReport } from '@core/domain-classes/report-classes/sale-return-report/sale-return-summary-report.interface';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import { SaleReturnReportService } from '../sale-return-report.service';
import { BillWiseSaleReturnReportTableColumns } from './bill-wise-sale-return-report-table-columns';
import * as XLSX from 'xlsx';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';

@Component({
  selector: 'app-bill-wise-sale-return-report',
  templateUrl: './bill-wise-sale-return-report.component.html',
  styleUrls: ['./bill-wise-sale-return-report.component.scss']
})
export class BillWiseSaleReturnReportComponent extends BaseComponent implements OnInit {

  searchForm:FormGroup
  billWiseReportResource:ReportResourceParameter
  billWiseReport:SaleReturnSummaryReport
  billWiseReportPdf:SaleReturnSummaryReport
  saleReturnSummaryList:SaleReturnSummaryReportList[] =[]
  branchUUID: string;
  colspan: number;
  columnVisibility:ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = BillWiseSaleReturnReportTableColumns
  billWiseReportTableColumns: ColumnDisplaySettings[];
  constructor
    (private fb:FormBuilder,
      private saleReturnReportService:SaleReturnReportService,
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
     this.sub$.sink = this.saleReturnReportService.getBillWiseSaleReturnReport(this.billWiseReportResource).subscribe((res:SaleReturnSummaryReport)=>{
      this.billWiseReport = res
      this.saleReturnSummaryList= this.billWiseReport.salesReturnReportlists
      this.loader.hide()
     },
     (error)=>{
      this.loader.hide();
     })
   }

   onClear(){
    this.resetForm();
    this.billWiseReportResource= this.searchForm.getRawValue()
    this.saleReturnSummaryList=[]
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
    const excelName = `Bill Wise Sale Return Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Bill Wise SR Report': worksheet }, SheetNames: ['Bill Wise SR Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
  }

  generatePdf(){
    let report = this.clonerService.deepClone<SaleReturnSummaryReport>(this.billWiseReport)
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
