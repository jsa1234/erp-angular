import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { DetailedReport } from '@core/domain-classes/report-classes/detailed-report';
import { PurchaseItemList } from '@core/domain-classes/report-classes/purchase-item-list';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { UpdateTableColumnVisibility } from '@shared/helpers/table-column-visibility.helper';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import * as XLSX from 'xlsx';
import { PurchaseReportService } from '../purchase-report.service';
import { DetailedPurchaseReportTableColumns } from './detailed-purchase-report-table-columns';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss'],
})
export class DetailedReportComponent extends BaseComponent implements OnInit {
  searchForm: FormGroup;
  detailedReportResource: ReportResourceParameter;
  detailedReport: DetailedReport;
  purchaseItemList: PurchaseItemList[] = [];
  detailedReportPdf: DetailedReport;
  columnVisibility: ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = DetailedPurchaseReportTableColumns
  branchUUID: string;
  colspan: number;
  detailedReportTableColumns: ColumnDisplaySettings[];
  constructor(
    private fb: FormBuilder,
    private purchaseReportService: PurchaseReportService,
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
    this.sub$.sink = this.purchaseReportService
      .gtDetailedReport(this.detailedReportResource)
      .subscribe((res: DetailedReport) => {
        this.detailedReport = res;
        this.purchaseItemList = this.detailedReport.purchaseItemList;
        this.loader.hide()
      });
  }
  onClear() {
    this.resetForm();
    this.detailedReportResource = this.searchForm.getRawValue();
    this.purchaseItemList = [];
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

  onDownloadReport() {
    const element = document.getElementById('report'); // Replace 'tableId' with the actual id of your table
    const excelName = `Detailed Purchase Report_${new Date().getTime()}`
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'Detailed Purchase Report': worksheet }, SheetNames: ['Detailed Purchase Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, excelName);
  }

  generatePdf() {
    let report = this.clonerService.deepClone<DetailedReport>(this.detailedReport);
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
}
