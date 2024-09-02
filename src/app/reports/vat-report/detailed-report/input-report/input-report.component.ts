import { Component, OnInit } from '@angular/core';
import { ITaxDetailedReport } from '@core/domain-classes/detailed-vat-report';
import { VatReportService } from '../../vat-report.service';
import { LoaderService } from '@shared/services/loader.service';
import { ClonerService } from '@core/services/clone.service';
import { SearchResponse } from '@core/domain-classes/search-response';
import { VatReportResourceParameter } from '@core/domain-classes/vat-report-resource-parameter';
import { Mode } from '@core/domain-classes/enums/vat-report-mode.enum';
import * as XLSX from 'xlsx';
import { SaveAsExcelFile } from '@shared/helpers/save-as-excel';
import { BaseComponent } from 'src/app/base.component';
import { Observable } from 'rxjs';
import { CommonError } from '@core/error-handler/common-error';

@Component({
  selector: 'app-input-report',
  templateUrl: './input-report.component.html',
  styleUrls: ['./input-report.component.scss']
})
export class InputReportComponent  extends BaseComponent implements OnInit {
  detailedTax:ITaxDetailedReport
  reportType:string
  vatDetailedReport: ITaxDetailedReport;
  vatDetailedReportType: string;
  constructor(
    private vatReportService:VatReportService,
    private loader:LoaderService,
    private clonerService:ClonerService,
  ) { super();}

  ngOnInit(): void {
  }
  onSearch(searchData: SearchResponse){
    this.loader.show();
    this.reportType = searchData.reportType;
    let resourceParams = new VatReportResourceParameter();
    resourceParams.fromDate = searchData.fromDate;
    resourceParams.toDate = searchData.toDate;
    resourceParams.deviceUuid = searchData.deviceUuid;
    resourceParams.branchUuid = searchData.branchUuid;
    resourceParams.mode = Mode.INPUT;
    this.sub$.sink =  this.getDetailedReport(this.reportType,resourceParams).subscribe((res:ITaxDetailedReport) => {
      this.detailedTax = res;
      this.loader.hide();
    });
  }
  
  generateExcel() {
    const element = document.getElementById('vat-report'); // Replace 'tableId' with the actual id of your table
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = { Sheets: { 'VAT Report Summary': worksheet }, SheetNames: ['VAT Report Summary'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    SaveAsExcelFile(excelBuffer, 'VAT Report Summary');
    }


    generatePdf() {
      this.vatDetailedReport = this.clonerService.deepClone<ITaxDetailedReport>(this.detailedTax);
      this.vatDetailedReportType = this.clonerService.deepClone<string>(this.reportType)
    }
    clear() {
      this.detailedTax = null;
      this.reportType = null;
    }

    getDetailedReport(reportType:string,resourceParams:VatReportResourceParameter):Observable<ITaxDetailedReport | CommonError> {
      return reportType == '0'?this.vatReportService.getDetailedMonthlyVatReport(resourceParams):this.vatReportService.getDetailedVatReport(resourceParams);
     }
    
}
