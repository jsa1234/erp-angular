import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import {
  ISalesInvoice,
  SalesInvoice,
} from '@core/domain-classes/sales-invoice';
import { SalesInvoiceDetails } from '@core/domain-classes/sales-invoiceDetail';
import { TranslationService } from '@core/services/translation.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-simplified',
  templateUrl: './simplified.component.html',
  styleUrls: ['./simplified.component.scss'],
})
export class SimplifiedComponent implements OnInit, OnChanges {
  @Input() simplifiedPDF: ISalesInvoice;
  @Input() companyProfilePdf: ICompany;
  salesInvoice: SalesInvoice;
  salesInvoiceList: SalesInvoiceDetails[] = [];
  qrCodeImage: string;
  companyProfile: Company;
  constructor(public translate: TranslationService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['simplifiedPDF'] && changes['companyProfilePdf']) {
      this.salesInvoiceList = this.simplifiedPDF.saleInvoiceDetails;
      this.salesInvoice = new SalesInvoice(this.simplifiedPDF);
      this.companyProfile = new Company(this.companyProfilePdf);
      const qrCodeData = this.salesInvoice.qrCode
        ? this.salesInvoice.qrCode
        : '';

      QRCode.toDataURL(
        qrCodeData,
        {
          errorCorrectionLevel: 'H',
          width: 200, // Set the size of the QR code image
        },
        (err, url) => {
          if (err) {
            console.log(err);
          } else {
            this.qrCodeImage = url;
          }
        }
      );
      this.simplifiedPDF = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }
  printInvoice() {
    let name = 'Simplified Sales Invoice';
    let printContents, popupWin;
    printContents = document.getElementById('simplified').innerHTML;
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
                qrcode {
                  display: block;
                }x
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
      `);
    popupWin.document.close();
  }
}
