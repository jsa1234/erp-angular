import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import { Product } from '@core/domain-classes/product';
import { IProductWiseReport } from '@core/domain-classes/report-classes/product-wise-report';
import { PurchaseItemList } from '@core/domain-classes/report-classes/purchase-item-list';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-product-wise-report-pdf',
  templateUrl: './product-wise-report-pdf.component.html',
  styleUrls: ['./product-wise-report-pdf.component.scss']
})
export class ProductWiseReportPdfComponent implements OnInit,OnChanges {
  @Input() productWiseReport:IProductWiseReport
  productWiseReportDetails:IProductWiseReport
  productWiseReportList:PurchaseItemList[]=[]
  product:Product
  companyProfile: Company;
  constructor(public translate:TranslationService, private securityService:SecurityService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subScribeCompanyProfile()
    if (changes['productWiseReport']) {
       this.productWiseReportList = this.productWiseReport.purchaseItemList;
       this.productWiseReportDetails = this.productWiseReport;
        this.product = new Product(this.productWiseReportDetails.product)
       this.productWiseReport = null;
     }
     setTimeout(() => {
       this.printInvoice();
     }, 1000);
    
  }
  subScribeCompanyProfile() {
    this.securityService.companyProfile.subscribe((data:ICompany) => {
      this.companyProfile = new Company(data);
    });
  }
  printInvoice() {
    let name = 'Product wise report'
    let printContents, popupWin;
    printContents = document.getElementById('purchaseReport').innerHTML;
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
