import { DrCrAccount } from "./dr-cr-account";

export interface IJournalDetail {
    journalDetailId:   number;
    journalDetailUUID: string;
    journalId:         number;
    journalUUID:       string;
    journalSubNo:      string;
    drAccountId:       number;
    drAccountUUID:     string;
    crAccountId:       number;
    crAccountUUID:     string;
    amount:            number;
    description:       string;
    createdBy:         string;
    modifiedBy:        null;
    branchId:          number;
    branchUUID:        string;
    deviceId:          number;
    deviceUUID:        string;
    crAccountObj:      DrCrAccount;
    drAccountObj:      DrCrAccount;
    drAccount:         string;
    crAccount:         string;
}