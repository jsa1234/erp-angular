import { Pipe, PipeTransform } from '@angular/core';
import { paymentMethods } from '@core/domain-classes/payment-method';

@Pipe({
    name: 'paymentmethod'
})

export class PaymentMethodPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        const paymentMethod = paymentMethods.find(c => c.id == value);
        if (paymentMethod) {
            return paymentMethod.name;
        }
        return '';
    }
}
