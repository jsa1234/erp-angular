import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { TranslationService } from '@core/services/translation.service';
import { BillWisePurchaseReturnReportTableColumns } from './bill-wise-purchase-return-report-table-columns';
import { BaseComponent } from 'src/app/base.component';
import { ClonerService } from '@core/services/clone.service';
import { LoaderService } from '@shared/services/loader.service';
import { PurchaseReturnReportService } from '../purchase-return-report.service';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { PurchaseReturnSummaryReport } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-summary.interface';
import { PurchaseReturnSummaryList } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-summary-list.interface';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import * as XLSX from 'xlsx';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';

@Component({
  selector: 'app-bill-wise-purchase-return-report',
  templateUrl: './bill-wise-purchase-return-report.component.html',
  styleUrls: ['./bill-wise-purchase-return-report.component.scss']
})
export class BillWisePurchaseReturnReportComponent extends BaseComponent implements OnInit {

  searchForm:FormGroup
  branchUUID:string
  purchaseSummaryList = []
  colspan: number;
  columnVisibility:ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = BillWisePurchaseReturnReportTableColumns
  billWiseReportTableColumns: ColumnDisplaySettings[];
  billWiseReportResource:ReportResourceParameter
  billwiseReport: PurchaseReturnSummaryReport;
  purchaseReturnSummaryList: PurchaseReturnSummaryList[] = [];
  billWiseReportPdf: PurchaseReturnSummaryReport;
  constructor(
    public translationService:TranslationService,
    private fb:FormBuilder,
    private clonerService: ClonerService,
    private loader:LoaderService,
    private purchaseReturnReportService:PurchaseReturnReportService,
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
  createSearchForm() {
    this.searchForm = this.fb.group({
      branch:[''],
      device:[''],
      supplier:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      mode:['']
    })
  }
  onSearch(){
    if(this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show();
    this.billWiseReportResource = this.searchForm.getRawValue();
    this.sub$.sink = this.purchaseReturnReportService.getBillwisePurchaseReturnReport( this.billWiseReportResource).subscribe((res:PurchaseReturnSummaryReport)=>{
      this.billwiseReport = res;
      this.purchaseReturnSummaryList = this.billwiseReport.purchaseReturnSummaryList;
      this.loader.hide()
    })
  }

  onClear(){
    this.resetForm();
    this.billWiseReportResource= this.searchForm.getRawValue()
    this.purchaseSummaryList=[]
    this.billwiseReport = null
  }

  resetForm(){
    this.searchForm.patchValue({
      device:'',
      fromDate:'',
      toDate:'',
      mode:'',
      accountUUID:'',
      supplier:'',
      branch:['']
    })
    this.searchForm.markAsUntouched()
  }
  generateExcel() {
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Bill Wise Purchase Return Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Bill Wise PR Report': worksheet }, SheetNames: ['Bill Wise PR Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
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


generatePdf(){
  let report = this.clonerService.deepClone<PurchaseReturnSummaryReport>(this.billwiseReport)
  const tableColumns = this.clonerService.deepClone<ColumnDisplaySettings[]>(UpdateTableColumnVisibility(this.columns,this.columnVisibility))
  this.billWiseReportPdf = report
  this.billWiseReportTableColumns = tableColumns
}
}
