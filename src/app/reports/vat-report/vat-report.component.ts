import {  Component} from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { CustomCurrencyPipe } from '@shared/pipes/custome-currency.pipe';
import { PaymentStatusPipe } from '@shared/pipes/purchase-order-paymentStatus.pipe';
import { UTCToLocalTime } from '@shared/pipes/utc-to-localtime.pipe';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-vat-report',
  templateUrl: './vat-report.component.html',
  styleUrls: ['./vat-report.component.scss'],
  providers: [UTCToLocalTime, CustomCurrencyPipe, PaymentStatusPipe]
})
export class VATReportComponent extends BaseComponent {
  isLoading$:boolean

  constructor(public translationService:TranslationService, private loader:LoaderService) {super();}

  ngOnInit(): void {
    this.loaderShowOrHide()
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
