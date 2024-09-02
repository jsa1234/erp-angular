import { Pipe, PipeTransform } from '@angular/core';
import { paymentStatuses } from '@core/domain-classes/payment-status';

@Pipe({
    name: 'paymentStatus'
})

export class PaymentStatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        const paymentaStatus = paymentStatuses.find(c => c.id == value);
        if (paymentaStatus) {
            return paymentaStatus.name;
        }
        return '';
    }
}
