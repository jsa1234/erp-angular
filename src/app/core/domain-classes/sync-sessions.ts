import { SyncOperationTypeText } from "./enums/sync-operation-type.enum";

export interface ISyncSessions{
    syncSessionId?:            number;
    syncSessionCode?:          string;
    tableName?:                string;
    deviceId?:                 number;
    deviceUUID?:               string;
    tableId?:                  number;
    syncMasterTableUUID?:      string;
    syncSessionStatus?:        number;
    syncSessionStatusName?:    string;
    syncSessionStatusMax?:     number;
    syncSessionStatusMaxName?: string;
    createdAt?:                Date;
    syncSessionType?:          number;
    syncSessionTypeName?:      string;
    createdBy?:                string;
    startedOn?:                Date;
    completedOrFailedOn?:      Date;
    syncOperationType?:        number;
    totalBlocks?:              number;
    currentBlock?:             number;
}

export class SyncSessions implements ISyncSessions{
    #_syncSessionCode:string
    #_tableName:string
    #_syncSessionStatusMaxName:string
    #_syncSessionTypeName:string
    #_syncOperationType:number
    #_startedOn:Date
    #_completedOrFailedOn:Date
    constructor(data:ISyncSessions) {
        this.#_syncSessionCode = data.syncSessionCode
        this.#_tableName = data.tableName
        this.#_syncSessionStatusMaxName = data.syncSessionStatusMaxName
        this.#_startedOn = data.startedOn
        this.#_completedOrFailedOn = data.completedOrFailedOn
        this.#_syncOperationType = data?.syncOperationType
        this.#_syncSessionTypeName = data?.syncSessionTypeName
    }

    public get session():string{
        return this.#_syncSessionCode
    }
    public get tableName():string{
        return this.#_tableName
    }
    public get action():string{
        return SyncOperationTypeText[this.#_syncOperationType]
    }
    public get status():string{
        return this.#_syncSessionStatusMaxName
    }
    public get startedOn():Date{
        return this.#_startedOn
    }
    public get completedOrFailedOn():Date{
        return this.#_completedOrFailedOn
    }
    public get type():string{
        return this.#_syncSessionTypeName
    }
}