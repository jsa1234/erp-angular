import { Component, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import { CreatedUser } from '@core/domain-classes/created-user';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { IPurchaseReturn, PurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { SupplierAccount } from '@core/domain-classes/supplierAccount';

@Component({
  selector: 'app-purchase-return-pdf',
  templateUrl: './purchase-return-pdf.component.html',
  styleUrls: ['./purchase-return-pdf.component.scss']
})
export class PurchaseReturnPdfComponent implements OnChanges {
@Input() purchaseReturnPdf:IPurchaseReturn
@Input() companyProfilePdf: ICompany;
purchaseReturnDetail:PurchaseReturn
companyProfile: Company;
purchaseReturnList:PurchaseReturnDetail[]=[]
supplier:SupplierAccount;
  createdUser: CreatedUser;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['purchaseReturnPdf']&&changes['companyProfilePdf'])
    {
      this.purchaseReturnDetail=new PurchaseReturn(this.purchaseReturnPdf)
      this.purchaseReturnList=this.purchaseReturnDetail.purchaseReturnDetails
      this.createdUser=this.purchaseReturnDetail.createdUser
      this.supplier = this.purchaseReturnDetail.supplier
      this.companyProfile = new Company(this.companyProfilePdf)
      this.purchaseReturnPdf=null;
      this.companyProfilePdf = null;
    }
    setTimeout(() => {
      this.printInvoice();
    }, 1000);
  
  }
  printInvoice() {
    let name = 'Purchase Return Invoice'
    let printContents, popupWin;
    printContents = document.getElementById('purchaseReturn').innerHTML;
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
