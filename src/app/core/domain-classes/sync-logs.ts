import { SyncActionStatusText } from "./enums/sync-action-status.enum";
import { TableModuleText } from "./enums/table-module.enum";

export interface ISyncLogs{
    deviceId?:       number;
    deviceUUID?:     string;
    syncActStatus?:  number;
    syncTime?:       Date;
    tableId?:        number;
    tableName?:      string;
    module?:         number;
    logType?:        number;
    logTypeName?:    string;
    logDescription?: string;
}


export class SyncLogs implements ISyncLogs{
    #_logTypeName:string
    #_logDescription:string
    #_tableName:string
    #_syncActStatus:number
    #_module:number
    #_syncTime:Date
    constructor(data:ISyncLogs){
        this.#_logDescription = data.logDescription
        this.#_logTypeName = data.logTypeName
        this.#_syncActStatus = data.syncActStatus
        this.#_syncTime = data.syncTime
        this.#_tableName = data.tableName
        this.#_module = data.module
    }

    public get logTypeName():string{
        return this.#_logTypeName
    }
    public get logDescription():string{
          let logDescription :string   
          try{
            logDescription = JSON.parse(this.#_logDescription)
          }catch{logDescription=this.#_logDescription}
          finally{
            return this.#_logDescription
          }
        
    }
    public get tableName():string{
        return this.#_tableName
    }
    public get syncActStatusName():string{
        return SyncActionStatusText[this.#_syncActStatus]
    }
    public get moduleName():string{
        return TableModuleText[this.#_module]
    }

    public get syncTime():Date{
        return this.#_syncTime
    }
}