import { SystemFlag } from "./system-flags.interface";

export interface SystemFlagConfiguration {
    companySystemFlagUUID?: string;
    companySystemFlagId?:   number;
    deviceSystemFlagUUID?: string;
    deviceSystemFlagId?:   number;
    branchSystemFlagUUID?: string
    branchSystemFlagId?: number
    userSystemFlagUUID?: string
    userSystemFlagId?: number
    companyUUID?:          string;
    branchUUID?:           string;
    deviceUUID?:           string;
    userUUID?:           string;
    systemFlagUUID?:       string;
    value?:                string;
    defaultValue?:         string;
    createdBy?:            null;
    modifiedBy?:           null;
    systemFlag?:           SystemFlag;
}

