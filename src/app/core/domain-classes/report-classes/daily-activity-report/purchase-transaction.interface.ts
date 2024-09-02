export interface PurchaseTransaction {
    transactionDocumentNo: string;
    amount:                number;
    supplierNameEnglish:   string;
    supplierNameArabic:    string;
    creditPurchase:        number;
    cashPurchase:          number;
}