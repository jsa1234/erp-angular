export interface SalesTransaction {
    transactionDocumentNo: string;
    amount:                number;
    clientNameEnglish:     string;
    clientNameArabic:      string;
    creditSale:            number;
    cashSale:              number;
    cardSale:              number;
}