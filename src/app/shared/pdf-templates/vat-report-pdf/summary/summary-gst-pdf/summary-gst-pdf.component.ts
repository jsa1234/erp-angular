import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CessSummary, ConsolidatedTaxCessReport, GstSummary } from '@core/domain-classes/consolidated-tax-cess-report.interface';
import { DateRangeInterval } from '@core/domain-classes/date-range.interface';

@Component({
  selector: 'app-summary-gst-pdf',
  templateUrl: './summary-gst-pdf.component.html',
  styleUrls: ['./summary-gst-pdf.component.scss']
})
export class SummaryGstPdfComponent implements OnChanges {

  @Input() summaryTaxReport:ConsolidatedTaxCessReport
  @Input() dateInterval:DateRangeInterval
  taxSummary: ConsolidatedTaxCessReport;
  cessSummary: CessSummary;
  gstSummary: GstSummary;
  fromDate: Date;
  toDate: Date;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['summaryTaxReport'] || changes['dateInterval']){
    this.taxSummary = this.summaryTaxReport
    this.cessSummary = this.taxSummary.cessSummary
    this.gstSummary = this.taxSummary.gstSummary
    this.fromDate = this.dateInterval.fromDate
    this.toDate = this.dateInterval.toDate
    this.summaryTaxReport = null
    this.dateInterval = null
   }

   setTimeout(() => {
    this.printInvoice();
  }, 1000);
  }
  printInvoice() {
    let name = 'Summary Tax Report'
    let printContents, popupWin;
    printContents = document.getElementById('taxReport').innerHTML;
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
