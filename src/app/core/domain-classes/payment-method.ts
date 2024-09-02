export class PaymentMethod {
    id: number;
    name: string;
}


export const paymentMethods: PaymentMethod[] = [
    {
        id: 0,
        name: 'Cash'
    }, {
        id: 1,
        name: 'Cheque'
    }, {
        id: 2,
        name: 'Credit Card'
    }, {
        id: 3,
        name: 'Gift Card'
    }, {
        id: 4,
        name: 'Other'
    }
];