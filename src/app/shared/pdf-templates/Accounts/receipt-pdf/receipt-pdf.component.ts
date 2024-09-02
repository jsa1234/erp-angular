import { Component, OnInit,OnChanges,SimpleChanges,Input  } from '@angular/core';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';
import { Company, ICompany } from '@core/domain-classes/company';
import { IVoucher, Voucher } from '@core/domain-classes/voucher';

@Component({
  selector: 'app-receipt-pdf',
  templateUrl: './receipt-pdf.component.html',
  styleUrls: ['./receipt-pdf.component.scss']
})
export class ReceiptPdfComponent implements OnInit, OnChanges{

  @Input() receiptPDF:IVoucher
  receipt:Voucher
  receiptDetailList:AccountVoucherDetails[]=[]
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receiptPDF']) {
      this.receiptDetailList = this.receiptPDF.accountVoucherDetails;
      this.receipt =new Voucher( this.receiptPDF);
      this.receiptPDF = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }

  printInvoice() {
    let name = 'Receipt'
    let printContents, popupWin;
    printContents = document.getElementById('receipt').innerHTML;
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
