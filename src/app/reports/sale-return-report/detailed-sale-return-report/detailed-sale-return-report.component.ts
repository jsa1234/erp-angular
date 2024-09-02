import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx'
import { SaleReturnReportService } from '../sale-return-report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { SaleReturnDetailedReport } from '@core/domain-classes/report-classes/sale-return-report/sale-return-detailed-report.interface';
import { SaleReturnDetailedReportList } from '@core/domain-classes/report-classes/sale-return-report/sale-return-detiled-report-list.interface';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
import { LoaderService } from '@shared/services/loader.service';
import { DetailedSaleReportTableColumns } from '../../sales-report/detailed-sales-report/detailed-sale-report-table-columns';
@Component({
  selector: 'app-detailed-sale-return-report',
  templateUrl: './detailed-sale-return-report.component.html',
  styleUrls: ['./detailed-sale-return-report.component.scss']
})
export class DetailedSaleReturnReportComponent extends BaseComponent implements OnInit {

  searchForm:FormGroup
  detailedReportResource:ReportResourceParameter
  detailedReport:SaleReturnDetailedReport
  detailedReportPdf:SaleReturnDetailedReport
  saleReturnDetailedItemList:SaleReturnDetailedReportList[] =[]
  columnVisibility: ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = DetailedSaleReportTableColumns
  branchUUID: string;
  colspan: number;
  detailedReportTableColumns: ColumnDisplaySettings[];
  constructor(
    private fb:FormBuilder,
    private clonerService:ClonerService,
    private saleReturnReportService:SaleReturnReportService,
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
     this.sub$.sink = this.saleReturnReportService.getDetailedSaleReturnReport(this.detailedReportResource).subscribe((res:SaleReturnDetailedReport)=>{
      this.detailedReport = res
     this.saleReturnDetailedItemList = this.detailedReport.salesReturnDetailReportList
     this.loader.hide()
     })

   }

   onClear(){
    this.resetForm();
    this.detailedReportResource= this.searchForm.getRawValue()
    this.saleReturnDetailedItemList=[]
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
    let report = this.clonerService.deepClone<SaleReturnDetailedReport>(this.detailedReport)
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
