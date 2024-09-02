import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITaxSummaryReport } from '@core/domain-classes/tax-summary-report';

@Component({
  selector: 'app-summary-yearly-quarterly-pdf',
  templateUrl: './summary-yearly-quarterly-pdf.component.html',
  styleUrls: ['./summary-yearly-quarterly-pdf.component.scss']
})
export class SummaryYearlyQuarterlyPdfComponent implements OnChanges {
  @Input() summaryVatRepot:ITaxSummaryReport
  taxSummary:ITaxSummaryReport
  constructor() { }

ngOnChanges(changes: SimpleChanges): void {
  if(changes['summaryVatRepot']){
    this.taxSummary = this.summaryVatRepot
    this.summaryVatRepot = null
  }

  setTimeout(() => {
    this.printInvoice();
  }, 1000);
}

printInvoice() {
  let name = 'Summary VAT Report'
  let printContents, popupWin;
  printContents = document.getElementById('VATReport').innerHTML;
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
          tr{
            border: 1px solid #000;
            border-spacing: 2px;
          }
          table {
            border-collapse: collapse;
          }
          th, td {
            padding: 5px;
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
