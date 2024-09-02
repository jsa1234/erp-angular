import { Component, Input, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import { ISalesInvoice, SalesInvoice } from '@core/domain-classes/sales-invoice';
import { SalesInvoiceDetails } from '@core/domain-classes/sales-invoiceDetail';
import { TranslationService } from '@core/services/translation.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit,OnChanges {
@Input() detailedPDF:ISalesInvoice
@Input() companyProfilePdf: ICompany;
salesInvoice:SalesInvoice
salesInvoiceList:SalesInvoiceDetails[]=[]
companyProfile: Company;
  qrCodeImage: string;
  constructor(public translate:TranslationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detailedPDF']&&changes['companyProfilePdf']) {
      this.salesInvoiceList = this.detailedPDF.saleInvoiceDetails;
      this.salesInvoice =new SalesInvoice(this.detailedPDF);
      this.companyProfile = new Company(this.companyProfilePdf)
      const qrCodeData = this.salesInvoice.qrCode ? this.salesInvoice.qrCode : '';
    
    
        QRCode.toDataURL(qrCodeData, {
          errorCorrectionLevel: 'H',
          width: 200, // Set the size of the QR code image
        }, (err, url) => {
          if (err) {
            console.log(err);
          } else {
            this.qrCodeImage = url;
          }
        });
      this.detailedPDF = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }
  printInvoice() {
    let name = 'Detailed Sales Invoice'
    let printContents, popupWin;
    printContents = document.getElementById('detailed').innerHTML;
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
