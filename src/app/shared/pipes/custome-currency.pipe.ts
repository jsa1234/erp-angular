import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SecurityService } from '@core/security/security.service';
import { CurrencyInfo } from '@core/domain-classes/currency-info';

@Pipe({
    name: 'customCurrency',
    pure: true
})
export class CustomCurrencyPipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe) {
    }
    transform(value: any, args?: any): any {
        value = value ?? 0;
        let currency:CurrencyInfo = new CurrencyInfo()
        return this.currencyPipe.transform(value, currency.currencyCode,currency.dispaly,currency.digitsInfo);
    }

}
