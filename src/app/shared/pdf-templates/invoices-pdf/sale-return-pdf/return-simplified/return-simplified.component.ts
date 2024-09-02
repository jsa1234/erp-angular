import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerAccount } from '@core/domain-classes/customer-account';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { ISalesReturn, SalesReturn } from '@core/domain-classes/sales-return';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-return-simplified',
  templateUrl: './return-simplified.component.html',
  styleUrls: ['./return-simplified.component.scss']
})
export class ReturnSimplifiedComponent implements OnChanges {
  @Input() simplifiedPDF: ISalesReturn;
  salesReturn: SalesReturn;
  salesReturnList: SaleReturnDetail[] = [];
  client: CustomerAccount;
  constructor(public translate: TranslationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['simplifiedPDF']) {
      this.salesReturnList = this.simplifiedPDF.saleReturnDetails;
      this.salesReturn = new SalesReturn(this.simplifiedPDF);
      this.client = this.salesReturn.customerDetails;
      this.simplifiedPDF = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }
  printInvoice() {
    let name = 'Simplified Sales Return';
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
