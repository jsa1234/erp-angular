import { Component, OnChanges,Input, SimpleChanges } from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import { CreatedUser } from '@core/domain-classes/created-user';
import { IPurchaseInvoice, PurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { SupplierAccount } from '@core/domain-classes/supplierAccount';

@Component({
  selector: 'app-purchase-invoice-pdf',
  templateUrl: './purchase-invoice-pdf.component.html',
  styleUrls: ['./purchase-invoice-pdf.component.scss']
})
export class PurchaseInvoicePdfComponent implements OnChanges {
  @Input() purchaseInvoicePdf: IPurchaseInvoice;
  purchaseInvoice: PurchaseInvoice;
  purchaseItems: PurchaseInvoiceDetail[];
  supplier:SupplierAccount;
  createdUser:CreatedUser;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['purchaseInvoicePdf']) {
      this.purchaseInvoice = new PurchaseInvoice(this.purchaseInvoicePdf);
      this.purchaseItems = this.purchaseInvoice.purchaseInvoiceDetails;
      this.createdUser = this.purchaseInvoice.createdUser;
      this.supplier = this.purchaseInvoice.supplier
      this.purchaseInvoicePdf = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }

  printInvoice() {
    let name = 'Purchase Invoice';
    let printContents, popupWin;
    printContents = document.getElementById('purchaseInvoice').innerHTML;
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
