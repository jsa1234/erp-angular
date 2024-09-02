import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { PaymentStatusPipe } from './purchase-order-paymentStatus.pipe';
import { PaymentMethodPipe } from './paymentMethod.pipe';
import { CustomCurrencyPipe } from './custome-currency.pipe';
import { UTCToLocalTime } from './utc-to-localtime.pipe';
import { KeysPipe } from './keys-pipe.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { VatFilterPipe } from './vat-filter.pipe';
import { ShowCrDrPipe } from './show-cr-dr.pipe';
import { EnumKeyToValuePipe } from './enum-key-to-value.pipe';
import { ConfigEnabledPipe } from './config-enabled.pipe';



@NgModule({
    declarations: [
        TruncatePipe,
        DateAgoPipe,
        PaymentStatusPipe,
        PaymentMethodPipe,
        CustomCurrencyPipe,
        UTCToLocalTime,
        KeysPipe,
        CustomDatePipe,
        VatFilterPipe,
        ShowCrDrPipe,
        EnumKeyToValuePipe,
        ConfigEnabledPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TruncatePipe,
        DateAgoPipe,
        PaymentStatusPipe,
        PaymentMethodPipe,
        CustomCurrencyPipe,
        UTCToLocalTime,
        KeysPipe,
        CustomDatePipe,
        VatFilterPipe,
        ShowCrDrPipe,
        EnumKeyToValuePipe,
        ConfigEnabledPipe
    ],
    providers: [CurrencyPipe,DatePipe]
})
export class PipesModule { }
