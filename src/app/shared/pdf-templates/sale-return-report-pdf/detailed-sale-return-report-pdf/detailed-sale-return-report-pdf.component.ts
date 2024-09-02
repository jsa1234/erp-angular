import { Component, OnInit,OnChanges, Input, SimpleChanges } from '@angular/core';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { Company, ICompany } from '@core/domain-classes/company';
import { SaleReturnDetailedReport } from '@core/domain-classes/report-classes/sale-return-report/sale-return-detailed-report.interface';
import { SaleReturnDetailedReportList } from '@core/domain-classes/report-classes/sale-return-report/sale-return-detiled-report-list.interface';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-detailed-sale-return-report-pdf',
  templateUrl: './detailed-sale-return-report-pdf.component.html',
  styleUrls: ['./detailed-sale-return-report-pdf.component.scss']
})
export class DetailedSaleReturnReportPdfComponent implements OnInit,OnChanges {

  @Input() detailedReport:SaleReturnDetailedReport
  @Input() detailedReportColumns:ColumnDisplaySettings[]
  detailedReportDetails:SaleReturnDetailedReport
  detailedReportList:SaleReturnDetailedReportList[]=[]
  companyProfile: Company;
  columns: ColumnDisplaySettings[] = [];
  columnVisibility: ColumnVisibility = {};
  constructor(public translate:TranslationService,private securityService:SecurityService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subScribeCompanyProfile()
    if (changes['detailedReport']) {
       this.detailedReportList = this.detailedReport.salesReturnDetailReportList;
       this.detailedReportDetails = this.detailedReport;
       this.columns = this.detailedReportColumns
       this.columns.forEach((column) => {
        this.columnVisibility[column.key] = column.visibleTableColumns; 
      });
       this.detailedReport = null;
       this.detailedReportColumns = null
     }
     setTimeout(() => {
       this.printInvoice();
     }, 1000);
    
  }
  subScribeCompanyProfile() {
    this.securityService.companyProfile.subscribe((data:ICompany) => {
      this.companyProfile = new Company(data);
    });
  }
  printInvoice() {
    let name = `Detailed Sale Return Report`
    let printContents, popupWin;
    printContents = document.getElementById('detailedSRreport').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
            @page { size: auto;  margin: 0mm;  margin-top:60px; }

            @media print {
              * {
                font-family: "Hind-Vadodara", sans-serif;
                -webkit-print-color-adjust: exact;
              }
            }
            </style>
            <script>
            function loadHandler(){

            var is_chrome = function () { return Boolean(window.chrome); }
        if(is_chrome)
        {
           window.print();
           setTimeout(function(){window.close();}, 1000);
           //give them 10 seconds to print, then close
        }
        else
        {
           window.print();
           window.close();
        }
        }
        </script>
          </head>
      <body onload="loadHandler()">${printContents}</body>
        </html>
    `
    );
    popupWin.document.close();
  }

}
