export interface ConsolidatedTaxCessReport {
    gstSummary:  GstSummary;
    cessSummary: CessSummary;
}

export interface CessSummary {
    totalPurchaseAmount:          number;
    totalSaleAmount:              number;
    totalPurchaseCessAmount:      number;
    totalPurchaseAddnlCessAmount: number;
    totalSaleCessAmount:          number;
    totalSaleAddnlCessAmount:     number;
    cessSummaryItems:             CessSummaryItem[];
}

export interface CessSummaryItem {
    cessNameEnglish:         string;
    cessNameSecondLanguage:  string;
    saleAmount:              number;
    purchaseAmount:          number;
    saleCessAmount:          number;
    purchaseCessAmount:      number;
    saleAddnlCessAmount:     number;
    purchaseAddnlCessAmount: number;
}

export interface GstSummary {
    totalPurchaseAmount:     number;
    totalPurchaseCgstAmount: number;
    totalPurchaseSgstAmount: number;
    totalPurchaseIgstAmount: number;
    totalSaleAmount:         number;
    totalSaleCgstAmount:     number;
    totalSaleSgstAmount:     number;
    totalSaleIgstAmount:     number;
    totalTaxAmount:          number;
    gstSummaryItems:         GstSummaryItem[];
}

export interface GstSummaryItem {
    saleAmount:         number;
    purchaseAmount:     number;
    saleCgstAmount:     number;
    saleSgstAmount:     number;
    saleIgstAmount:     number;
    purchaseCgstAmount: number;
    purchaseSgstAmount: number;
    purchaseIgstAmount: number;
    taxNameEnglish:     string;
    taxAmount:          number;
}