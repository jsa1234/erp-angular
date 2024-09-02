import { ControlType } from "./enums/control-type.enum";

export interface SystemFlag {
    systemFlagId:   number;
    systemFlagUUID: string;
    name:           string;
    value:          string;
    defaultValue:   string;
    valueList:      string;
    description:    string;
    label:          string;
    modifiedBy:     null;
    createdBy:      null;
    configType:     string;
    behaviour:      string;
    controlType:    ControlType;
}