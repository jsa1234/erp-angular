import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { DetailedSalesReport } from '@core/domain-classes/report-classes/sales-report/detailed-sales-report';
import { SalesInvoiceItemReportlist } from '@core/domain-classes/report-classes/sales-report/sales-invoice-item-report-list';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx';
import { SalesReportService } from '../sales-report.service';
import { DetailedSaleReportTableColumns } from './detailed-sale-report-table-columns';

@Component({
  selector: 'app-detailed-sales-report',
  templateUrl: './detailed-sales-report.component.html',
  styleUrls: ['./detailed-sales-report.component.scss']
})
export class DetailedSalesReportComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup
  detailedReportResource:ReportResourceParameter
  detailedReport:DetailedSalesReport
  detailedReportPdf:DetailedSalesReport
  purchaseItemList:SalesInvoiceItemReportlist[] =[]
  columnVisibility: ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = DetailedSaleReportTableColumns
  branchUUID: string;
  colspan: number;
  detailedReportTableColumns: ColumnDisplaySettings[];
  constructor(
    private fb:FormBuilder,
    private clonerService:ClonerService,
    private salesReportService:SalesReportService,
    public translate: TranslationService,
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
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      customer: [''] ,
      product: [''],
    })
  }

  onSearch(){
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
     this.detailedReportResource= this.searchForm.getRawValue()
     this.sub$.sink = this.salesReportService.getDetailedSalesReport(this.detailedReportResource).subscribe((res:DetailedSalesReport)=>{
      this.detailedReport = res
     this.purchaseItemList = this.detailedReport.salesInvoiceItemReportlists
     this.loader.hide()
     })

   }

   onClear(){
    this.resetForm();
    this.detailedReportResource= this.searchForm.getRawValue()
    this.purchaseItemList=[]
    this.detailedReport=null
  }

  resetForm(){
    this.searchForm.patchValue({
      device:'',
      fromDate:'',
      toDate:'',
      customer: '' ,
      product: '',
    })
    this.searchForm.markAsUntouched()

  }

  onDownloadReport(){
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Detailed Sale Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Detailed Sale Report': worksheet }, SheetNames: ['Detailed Sale Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
  }

  generatePdf(){
    let report = this.clonerService.deepClone<DetailedSalesReport>(this.detailedReport)
    const tableColumns = this.clonerService.deepClone<ColumnDisplaySettings[]>(UpdateTableColumnVisibility(this.columns,this.columnVisibility))
    this.detailedReportPdf = report
    this.detailedReportTableColumns = tableColumns

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