import { SystemFlag } from "./system-flags.interface";

export interface UserSystemFlag {
    userSystemFlagUUID: string;
    userSystemFlagId:   number;
    companyUUID:        string;
    branchUUID:         string;
    deviceUUID:         string;
    userUUID:           string;
    systemFlagUUID:     string;
    value:              string;
    defaultValue:       string;
    modifiedBy:         null;
    createdBy:          null;
    systemFlag:         SystemFlag;
}