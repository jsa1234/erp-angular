export interface ITaxSummaryReport {
    taxSlabs:             number[];
    taxData:              ITaxData[];
    inputTaxTotal:        ITaxTotal[];
    outputTaxTotal:       ITaxTotal[];
    totalInputTaxAmount:  number;
    totalOutputTaxAmount: number;
    taxAmountPayable:     number;
}

export interface ITaxTotal {
    slab:   number;
    amount: number;
}

export interface ITaxData {
    month:            string;
    inputTaxes:       ITaxes[];
    inputTaxSum:      number;
    inputTaxableSum:  number;
    outputTaxSum:     number;
    outputTaxableSum: number;
    outputTaxes:      ITaxes[];
}

export interface ITaxes {
    slab:          number;
    taxAmount:     number;
    taxableAmount: number;
}



  