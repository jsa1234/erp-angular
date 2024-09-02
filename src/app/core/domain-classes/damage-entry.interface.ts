import { IBranch } from "./branch";
import { IDamageEntryDetail } from "./damage-entry-details.interface";

export interface IDamageEntry {
    damageUUID?:     string;
    docNo?:          string;
    docDate?:        Date;
    branchUUID?:     string;
    deviceUUID?:     string;
    documentUUID?:   string;
    remarks?:        string;
    netTotalAmount?: number;
    damageDetails?:  IDamageEntryDetail[];
    isUpdate?:      boolean
    branch?:         IBranch;
}

