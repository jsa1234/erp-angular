import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ICompany, Company } from '@core/domain-classes/company';
import { IJournal, Journal } from '@core/domain-classes/journal';
import { IJournalDetail } from '@core/domain-classes/journal-details';

@Component({
  selector: 'app-journal-pdf',
  templateUrl: './journal-pdf.component.html',
  styleUrls: ['./journal-pdf.component.scss']
})
export class JournalPdfComponent implements OnInit,OnChanges {
  @Input() journalPDF:IJournal
 journal:Journal
 journalDetailList:IJournalDetail[]=[]
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['journalPDF']) {
      this.journalDetailList = this.journalPDF.journalDetails;
      this.journal = new Journal(this.journalPDF);
      this.journalPDF = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }


  printInvoice() {
    let name = 'Journal'
    let printContents, popupWin;
    printContents = document.getElementById('journal').innerHTML;
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
