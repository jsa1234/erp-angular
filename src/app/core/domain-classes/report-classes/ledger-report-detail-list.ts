export interface LedgerReportDataList {

  previousSum:            number;
  transactionDocumentNo:  string;
  particulars:            string;
  accountTransactionDate: Date;
  accountSourceType:      number;
  amount:                 number;
  balance:                number;
  balanceDebitCredit:     string;
  narration:              string;
  absoluteAmount:         number;
  debits:                 number;
  credits:                number;
}
