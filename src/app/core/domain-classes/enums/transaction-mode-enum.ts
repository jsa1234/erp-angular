export enum  TransactionMode {
    CASH,
    CREDIT,
    CARD,
    PP,
    CAPRD,
    PPMRD,
    UPI,
    MULTIPAYMENT
}

export type TransactionModeMapping = {
    key: TransactionMode;
    valueEnglish: string;
    valueSecondLanguage: string;
};

export const TransactionModeArray:TransactionModeMapping[] = [
    { key: TransactionMode.CASH, valueEnglish: 'CASH', valueSecondLanguage: 'نقدي'  },
    { key: TransactionMode.CREDIT, valueEnglish: 'CREDIT', valueSecondLanguage: 'ائتمان'},
    { key: TransactionMode.CARD, valueEnglish: 'CARD', valueSecondLanguage: 'ائتمان'},
   // { key: TransactionMode.PP, valueEnglish: 'PP', valueSecondLanguage: 'ائتمان'},
   //  { key: TransactionMode.CAPRD, valueEnglish: 'CAPRD', valueSecondLanguage: 'ائتمان'},
   //  { key: TransactionMode.PPMRD, valueEnglish: 'PPMRD', valueSecondLanguage: 'ائتمان'},
    {key:TransactionMode.UPI,valueEnglish:'UPI',valueSecondLanguage:''},
    {key:TransactionMode.MULTIPAYMENT,valueEnglish:'MULTI PAYMENT',valueSecondLanguage:''}
  ];