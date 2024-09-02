import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AccountDetails } from '@core/domain-classes/account-details.interface';
import { LedgerReportDataList } from '@core/domain-classes/report-classes/ledger-report-detail-list';
import { StatementOfAccount } from '@core/domain-classes/report-classes/statment-of-accounts';

@Component({
  selector: 'app-statement-of-account-pdf',
  templateUrl: './statement-of-account-pdf.component.html',
  styleUrls: ['./statement-of-account-pdf.component.scss']
})
export class StatementOfAccountPdfComponent implements OnChanges {
  @Input() ledgerReport:StatementOfAccount
  accountDetails:AccountDetails
  ledgerReportDetails:StatementOfAccount
  ledgerReportList:LedgerReportDataList[]=[]
   constructor() { }
   ngOnChanges(changes: SimpleChanges): void {
    if (changes['ledgerReport'] ) {
       this.ledgerReportList = this.ledgerReport.ledgerReportDataList;
       this.ledgerReportDetails = this.ledgerReport;
       this.accountDetails = this.ledgerReport.accountDetails
       this.ledgerReport = null;
     }
     setTimeout(() => {
       this.printInvoice();
     }, 1000);

  }


   printInvoice() {
     let name = 'Statement Of Account report'
     let printContents, popupWin;
     printContents = document.getElementById('ledgerReport').innerHTML;
     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
     popupWin.document.open();
     popupWin.document.write(`
         <html>
           <head>
             <title>${name}</title>

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

