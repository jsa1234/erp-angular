import { Component, OnInit } from '@angular/core';
import { VatReportService } from '../vat-report.service';
import { ITaxSummaryReport } from '@core/domain-classes/tax-summary-report';
import { VatReportResourceParameter } from '@core/domain-classes/vat-report-resource-parameter';
import * as XLSX from 'xlsx';
import { SearchResponse } from '@core/domain-classes/search-response';
import { LoaderService } from '@shared/services/loader.service';
import { ClonerService } from '@core/services/clone.service';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { CessSummary, ConsolidatedTaxCessReport, GstSummary } from '@core/domain-classes/consolidated-tax-cess-report.interface';
import { DateRangeInterval } from '@core/domain-classes/date-range.interface';
@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit {
  // reportType: string;
  vatSummaryReportType: string;
  taxSummary: ConsolidatedTaxCessReport;
  taxSummaryPdf: ConsolidatedTaxCessReport;
  cessSummary:CessSummary
  gstSummary:GstSummary
  dateObject:DateRangeInterval;
  dateObjectPdf: DateRangeInterval;
  constructor(
    private vatReportService: VatReportService,
    private loader: LoaderService,
    private clonerService:ClonerService,
  ) {}

  ngOnInit(): void {
  }

  onSearch(searchData: SearchResponse) {
    this.loader.show();
    // this.reportType = searchData.reportType;
    this.dateObject = {
      fromDate: searchData.fromDate,
      toDate:  searchData.toDate
    }
    let resourceParams = new VatReportResourceParameter();
    resourceParams.fromDate = searchData.fromDate;
    resourceParams.toDate = searchData.toDate;
    resourceParams.deviceUuid = searchData.deviceUuid;
    resourceParams.branchUuid = searchData.branchUuid;
    this.vatReportService
      .getGSTSummaryReport(resourceParams)
      .subscribe((res: ConsolidatedTaxCessReport) => {
        this.taxSummary = res;
        this.cessSummary = this.taxSummary.cessSummary
        this.gstSummary = this.taxSummary.gstSummary
        this.loader.hide();
      });
  }



  generateExcel() {
  const element = document.getElementById('tax-report'); // Replace 'tableId' with the actual id of your table
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const workbook: XLSX.WorkBook = { Sheets: { 'Tax Report Summary': worksheet }, SheetNames: ['Tax Report Summary'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  SaveAsExcelFile(excelBuffer, 'Tax Report Summary');
  }
  
  
  generatePdf() {
    this.taxSummaryPdf = this.clonerService.deepClone<ConsolidatedTaxCessReport>(this.taxSummary);
    this.dateObjectPdf = this.clonerService.deepClone<DateRangeInterval>(this.dateObject)
    // this.vatSummaryReportType = this.clonerService.deepClone<string>(this.reportType)
  }
  clear() {
    this.taxSummary = null;
    // this.reportType = null;
  }


}

