export interface IPaymentTransactions{
    paymentTransactionUUID: string;
    paymentTransactionId:   number;
    transactionDate:        Date;
    transactionNo:          string;
    transactionAmount:      number;
    transactionMasterUUID:  string;
    trasactionDocumentNo:   string;
    transactionMode:        number;
    transactionStatus:      number;
    transactionReferenceId: string;
    transactionSignature:   string;
    createdBy:              string;
    modifiedBy:             string;
}