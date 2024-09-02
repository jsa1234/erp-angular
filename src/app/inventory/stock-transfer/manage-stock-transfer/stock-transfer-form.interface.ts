export interface StockTransferForm{
    stockTransferUUID: string;
    docNo: string; 
    docDate: Date;
    refInvNo: string;
    refInvDate:Date;
    sourceBranchUUID: string;
    destinationBranchUUID: string;
    remarks: string;
    userUUID: string;
}