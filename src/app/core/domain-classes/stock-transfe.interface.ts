import { IBranch } from "./branch";
import { IStockTransferItem } from "./stock-transfer-items.interface";

export interface IStockTransfer{
    stockTransferUUID?:     string;
    stockTransferId?:       number;
    docNo?:                 string;
    docDate?:               Date;
    refInvNo?:              string;
    refInvDate?:            Date;
    branchUUID?:            string;
    deviceUUID?:            string;
    sourceBranchUUID?:      string;
    destinationBranchUUID?: string;
    remarks?:               string;
    netTotalAmount?:        number;
    documentUUID?:          string;
    userUUID?:              string;
    branch?:                null;
    sourceBranch?:          IBranch;
    destinationBranch?:     IBranch;
    stockTransferDetails?:  IStockTransferItem[];
}