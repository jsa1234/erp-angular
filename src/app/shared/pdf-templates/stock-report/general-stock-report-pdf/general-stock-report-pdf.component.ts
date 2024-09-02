import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GeneralStockReport } from '@core/domain-classes/report-classes/stock-report/general-report';
import { StockGeneralReportList } from '@core/domain-classes/report-classes/stock-report/general-stock-report';

@Component({
  selector: 'app-general-stock-report-pdf',
  templateUrl: './general-stock-report-pdf.component.html',
  styleUrls: ['./general-stock-report-pdf.component.scss']
})
export class GeneralStockReportPdfComponent implements OnInit,OnChanges {
  @Input() generalstockWiseReport:GeneralStockReport
  generalReportDetails:GeneralStockReport
  stockGeneralReportList:StockGeneralReportList[]=[]
   constructor() { }

   ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generalstockWiseReport']) {
       this.stockGeneralReportList = this.generalstockWiseReport?.stockGeneralReportList;
       this.generalReportDetails = this.generalstockWiseReport;
       this.generalstockWiseReport = null;
     }
     setTimeout(() => {
       this.printInvoice();
     }, 1000);

  }

  printInvoice() {
    let name = 'general stock report'
    let printContents, popupWin;
    printContents = document.getElementById('generalReport').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open()
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
