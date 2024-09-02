import { Component, Input,OnChanges,SimpleChanges } from '@angular/core';
import { DailyActivityReport } from '@core/domain-classes/report-classes/daily-activity-report/daily-activity-report.class';

@Component({
  selector: 'app-daily-activity-report-pdf',
  templateUrl: './daily-activity-report-pdf.component.html',
  styleUrls: ['./daily-activity-report-pdf.component.scss']
})
export class DailyActivityReportPdfComponent implements OnChanges  {
  @Input() dailyActivityReportPDF:DailyActivityReport
dailyActivityReport:DailyActivityReport
  constructor() { }

ngOnChanges(changes:SimpleChanges){
  if (changes['dailyActivityReportPDF']) {
    this.dailyActivityReport = this.dailyActivityReportPDF;
    this.dailyActivityReportPDF = null;
  }
  setTimeout(() => {
    this.printInvoice();
  }, 1000);
}

printInvoice() {
  let name = 'Daily Activity Report';
  let printContents, popupWin;
  printContents = document.getElementById('dailyActivityReport').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
      <html>
        <head>
          <title>${name}</title>
          
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
