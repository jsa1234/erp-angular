import { CreatedUser, ICreatedUser } from "./created-user";
import { IJournalDetail } from "./journal-details";

export interface IJournal {
    journalId?:      number;
    journalUUID?:    string;
    docDate?:        Date;
    docNo?:          string;
    description?:    string;
    totalDrAmount?:  number;
    totalCrAmount?:  number;
    createdBy?:      string;
    modifiedBy?:     string;
    branchId?:       number;
    branchUUID?:     string;
    deviceId?:       number;
    deviceUUID?:     string;
    createdUser?:    ICreatedUser;
    journalDetails?: IJournalDetail[];
}

export class Journal implements IJournal{
    #_journalUUID:    string;
    #_docDate:        Date;
    #_docNo:          string;
    #_branchUUID:          string;
    #_totalDrAmount:  number;
    #_totalCrAmount:  number;
    #_createdUser:           ICreatedUser;
    constructor(data:IJournal) {
        this.#_journalUUID  = data.journalUUID 
        this.#_docDate =        data.docDate;
        this.#_docNo =          data.docNo;
        this.#_totalDrAmount =  data.totalDrAmount;
        this.#_totalCrAmount =  data.totalDrAmount;
        this.#_createdUser = data.createdUser
        this.#_branchUUID = data.branchUUID
    }

    public get journalNo():string{
        return this.#_docNo        
    }
    public get journalDate():Date{
        return this.#_docDate
    }
    public get totalDrAmount():number{
        return this.#_totalDrAmount
    }
    public get totalCrAmount():number{
        return this.#_totalCrAmount
    }
    public get createdBy():string{
        let user:CreatedUser = this.#_createdUser?new CreatedUser( this.#_createdUser):null
        return user?.name || ''
    }
    public get journalUUID():string{
        return this.#_journalUUID
    }
    public get branchUUID():string{
        return this.#_branchUUID
    }
}