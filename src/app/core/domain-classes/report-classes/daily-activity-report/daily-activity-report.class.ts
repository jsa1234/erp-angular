import { PurchaseTransaction } from "./purchase-transaction.interface";
import { ReceiptPayment } from "./receipt-payment.interface";
import { SalesTransaction } from "./sales-transaction.interface";

export class DailyActivityReport {
    totalCashSale:        number;
    totalCreditSale:      number;
    totalCardSale:        number;
    totalSales:           number;
    otherRecipts:         number;
    otherPayments:        number;
    totalCashFlowSummary: number;
    totalSummary:         number;
    closingBalance:       number;
    totalCashPurchase:    number;
    totalCreditsPurchase: number;
    totalRecipts:         number;
    totalPayments:        number;
    date:                 Date;
    salesTransactions:    SalesTransaction[];
    purchaseTransactions: PurchaseTransaction[];
    reciptPayments:       ReceiptPayment[];
    vatCollected:         number;
    openingbalance:       number;
    purchaseReturns:      number;
    salesReturns:         number;
}