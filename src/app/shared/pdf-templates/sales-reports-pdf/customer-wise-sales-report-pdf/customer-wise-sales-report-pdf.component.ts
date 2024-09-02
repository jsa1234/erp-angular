import { Component, OnInit,Input,OnChanges,SimpleChanges } from '@angular/core';
import { ICompany, Company } from '@core/domain-classes/company';
import { CustomerAccount } from '@core/domain-classes/customer-account';
import { CustomerWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/customer-wise-sales-report';
import { SalesSummaryReportByClientInnerList } from '@core/domain-classes/report-classes/sales-report/sales-summary-report-by-client-inner-list';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-customer-wise-sales-report-pdf',
  templateUrl: './customer-wise-sales-report-pdf.component.html',
  styleUrls: ['./customer-wise-sales-report-pdf.component.scss']
})
export class CustomerWiseSalesReportPdfComponent implements OnInit,OnChanges {
  @Input() customerWiseReport:CustomerWiseSalesReport
  customerWiseReportDetails:CustomerWiseSalesReport
  customerWiseReportList:SalesSummaryReportByClientInnerList[]=[]
  customer:CustomerAccount
  companyProfile: Company;
  constructor(public translate:TranslationService,private securityService:SecurityService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subScribeCompanyProfile()
    if (changes['customerWiseReport']) {
       this.customerWiseReportList = this.customerWiseReport.salesSummaryReportByClientInnerList;
       this.customerWiseReportDetails = this.customerWiseReport;
       let pr = this.customerWiseReportDetails.client
       this.customer = new CustomerAccount(pr) 
       this.customerWiseReport = null;
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
    let name = 'Customer wise report'
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
