import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { Company, ICompany } from '@core/domain-classes/company';
import { PurchaseReturnSummaryList } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-summary-list.interface';
import { PurchaseReturnSummaryReport } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-summary.interface';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-bill-wise-purchase-return-report-pdf',
  templateUrl: './bill-wise-purchase-return-report-pdf.component.html',
  styleUrls: ['./bill-wise-purchase-return-report-pdf.component.scss']
})
export class BillWisePurchaseReturnReportPdfComponent implements OnInit,OnChanges {

  @Input() billWiseReport:PurchaseReturnSummaryReport
  @Input() billWiseReportColumns:ColumnDisplaySettings[]
 billWiseReportDetails:PurchaseReturnSummaryReport
 billWiseReportList:PurchaseReturnSummaryList[]=[]
  companyProfile: Company;
  columns: ColumnDisplaySettings[] = [];
  columnVisibility: ColumnVisibility = {};
  constructor(public translate:TranslationService,private securityService:SecurityService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subScribeCompanyProfile()
    if (changes['billWiseReport']) {
       this.billWiseReportList = this.billWiseReport.purchaseReturnSummaryList;
       this.billWiseReportDetails = this.billWiseReport;
       this.columns = this.billWiseReportColumns
       this.columns.forEach((column) => {
        this.columnVisibility[column.key] = column.visibleTableColumns; 
      });
       this.billWiseReport = null;
       this.billWiseReportColumns = null
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
    let name = 'bill wise Purchase Return report'
    let printContents, popupWin;
    printContents = document.getElementById('purchaseReturnreport').innerHTML;
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
