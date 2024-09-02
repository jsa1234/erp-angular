import {  DeviceActivationStatusText } from "./enums/device-activation-status";
import {  DeviceTypeText } from "./enums/device-type";

export class Device implements IDevice{
    #_deviceId?:         number;
    #_deviceUUID?:       string;
    #_nameEnglish?:       string;
    #_nameArabic?:       string;
    #_branchId?:         number;
    #_branchUUID?:       string;
    #_deviceType?:       number;
    #_deviceIdentifier?: string;
    #_modelNo?:          string;
    #_actStatus?:        number;
    #_installationDate?: Date;
    #_lastSyncedOn?: Date;
    #_actDate?: Date;
    #_actCode?: string;
    #_deviceCode?: string;

    public get deviceId(): number {
        return this.#_deviceId;
    }
    public get nameEnglish(): string {
        return this.#_nameEnglish;
    }
    public get nameSecondLanguage(): string {
        return this.#_nameArabic;
    }
    public get deviceUUID(): string {
        return this.#_deviceUUID;
    }
    public get branchId(): number {
        return this.#_branchId;
    }
    public get branchUUID(): string {
        return this.#_branchUUID;
    }
    public get deviceType(): number {
        return this.#_deviceType;
    }
    public get deviceIdentifier(): string {
        return this.#_deviceIdentifier;
    }
    public get modelNo(): string {
        return this.#_modelNo;
    }
    public get actStatus(): number {
        return this.#_actStatus;
    }
    public get installationDate(): Date {
        return this.#_installationDate
    }
    public get actDate(): Date {
        return this.#_actDate
    }
    public get lastSyncedOn(): Date {
        return this.#_lastSyncedOn
    }
    public get deviceTypeText():string{
        return DeviceTypeText[this.#_deviceType]
    }
    public get deviceStatusText():string{
        return DeviceActivationStatusText[this.#_actStatus]
    }
    public get actCode():string{
        return this.#_actCode
    }
    public get deviceCode():string{
        return this.#_deviceCode
    }



    constructor(values:IDevice) {
        this.#_deviceId = values.deviceId
        this.#_deviceUUID = values.deviceUUID
        this.#_branchId = values.branchId
        this.#_branchUUID = values.branchUUID
        this.#_deviceType = values.deviceType
        this.#_deviceIdentifier = values.deviceIdentifier
        this.#_modelNo = values.modelNo
        this.#_actStatus = values.actStatus
        this.#_installationDate = values.installationDate
        this.#_actDate = values.actDate
        this.#_lastSyncedOn = values.lastSyncedOn
        this.#_nameArabic = values.nameSecondLanguage
        this.#_nameEnglish = values.nameEnglish
        this.#_actCode = values.actCode
        this.#_deviceCode = values.deviceCode


    }
}
export interface IDevice{
    deviceId?:         number;
    deviceUUID?:       string;
    nameEnglish?:       string;
    nameSecondLanguage?:       string;
    branchId?:         number;
    branchUUID?:       string;
    deviceType?:       number;
    deviceIdentifier?: string;
    modelNo?:          string;
    actStatus?:        number;
    installationDate?: Date;
    actDate?: Date;
    lastSyncedOn?: Date;
    deviceTypeText?: string;
    deviceStatusText?: string;
    actCode?: string;
    deviceCode?: string;

}
