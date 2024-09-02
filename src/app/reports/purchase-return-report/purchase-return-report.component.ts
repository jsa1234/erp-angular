import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-purchase-return-report',
  templateUrl: './purchase-return-report.component.html',
  styleUrls: ['./purchase-return-report.component.scss']
})
export class PurchaseReturnReportComponent extends BaseComponent  implements OnInit {
  isLoading$: boolean=false;
  constructor( public translationService: TranslationService, private loader:LoaderService) {super(); }

  ngOnInit(): void {
    this.loaderShowOrHide()
  }


  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
}
