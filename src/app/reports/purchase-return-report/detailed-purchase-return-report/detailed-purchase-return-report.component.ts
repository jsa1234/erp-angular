import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { PurchaseReturnDetailReport } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-detailed-report.interface';
import { PurchaseReturnDetailReportList } from '@core/domain-classes/report-classes/purchase-return-report/purhase-return-detail-report-list.interface';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseReturnReportService } from '../purchase-return-report.service';
import { DetailedPurchaseReturnReportTableColumns } from './detailed-purchase-return-report-table-columns';
import *as XLSX from 'xlsx'
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
@Component({
  selector: 'app-detailed-purchase-return-report',
  templateUrl: './detailed-purchase-return-report.component.html',
  styleUrls: ['./detailed-purchase-return-report.component.scss']
})
export class DetailedPurchaseReturnReportComponent extends BaseComponent implements OnInit {
  searchForm: FormGroup;
  detailedReportResource: ReportResourceParameter;
  detailedReport: PurchaseReturnDetailReport;
  purchaseReturnItemList: PurchaseReturnDetailReportList[] = [];
  detailedReportPdf: PurchaseReturnDetailReport;
  columnVisibility: ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = DetailedPurchaseReturnReportTableColumns
  branchUUID: string;
  colspan: number;
  detailedReportTableColumns: ColumnDisplaySettings[];
  constructor(
    private fb: FormBuilder,
    private purchaseReturnReportService: PurchaseReturnReportService,
    public translate: TranslationService,
    private clonerService: ClonerService,
    private loader:LoaderService
  ) {
    super();
    this.columns.forEach((column) => {
      this.columnVisibility[column.key] = column.visibleTableColumns; // Initialize visibility
    });
    this.colspan = this.columns.filter(column => column.visibleTableColumns).length
  }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      branch:[''],
      device: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      supplier: ['' ],
      product: [''],
    });
  }
  onSearch() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
    this.detailedReportResource = this.searchForm.getRawValue();
    this.sub$.sink = this.purchaseReturnReportService
      .getDetailPurchaseReturnReport(this.detailedReportResource)
      .subscribe((res: PurchaseReturnDetailReport) => {
        this.detailedReport = res;
        this.purchaseReturnItemList = this.detailedReport.purchaseReturnItemList;
        this.loader.hide()
      });
  }
  onClear() {
    this.resetForm();
    this.detailedReportResource = this.searchForm.getRawValue();
    this.purchaseReturnItemList = [];
    this.detailedReport=null
    this.searchForm.markAsUntouched()
  }

  resetForm() {
    this.searchForm.patchValue({
      device: '',
      fromDate: '',
      toDate: '',
      
      supplier: '' ,
      product: '',
    });
  }

  generatePdf() {
    let report = this.clonerService.deepClone<PurchaseReturnDetailReport>(this.detailedReport);
    const tableColumns = this.clonerService.deepClone<ColumnDisplaySettings[]>(UpdateTableColumnVisibility(this.columns,this.columnVisibility))
    this.detailedReportPdf = report;
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

  generateExcel() {
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Detailed Purchase Return Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Detailed PR Report': worksheet }, SheetNames: ['Detailed PR Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
    }

}
