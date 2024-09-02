import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { ISalesReturn, SalesReturn } from '@core/domain-classes/sales-return';
import { ICompany, Company } from '@core/domain-classes/company';
import { CustomerAccount } from '@core/domain-classes/customer-account';
@Component({
  selector: 'app-return-detailed',
  templateUrl: './return-detailed.component.html',
  styleUrls: ['./return-detailed.component.scss']
})
export class ReturnDetailedComponent implements OnChanges {
  @Input() detailedPDF:ISalesReturn
  salesReturn:SalesReturn
  salesReturnList:SaleReturnDetail[]=[]
  @Input() companyProfilePdf: ICompany;
companyProfile: Company;
  client: CustomerAccount;

  constructor(public translationService:TranslationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detailedPDF']&&changes['companyProfilePdf']) {
      this.salesReturnList = this.detailedPDF.saleReturnDetails;
      this.salesReturn =new SalesReturn(this.detailedPDF);
      this.client =this.salesReturn.customerDetails
      this.companyProfile = new Company(this.companyProfilePdf)
      this.detailedPDF = null;
      this.companyProfilePdf = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  }
  printInvoice() {
    let name = 'Detailed Sales Return'
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
