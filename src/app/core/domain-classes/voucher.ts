import { AccountVoucherDetails } from "./account-voucher-details";
import { CreatedUser, ICreatedUser } from "./created-user";

export interface IVoucher {
    accountVoucherUUID?:    string;
    docNo?:                 string;
    description?:           string;
    totalAmount?:           number;
    voucherType?:           number;
    docDate?:               Date;
    branchUUID?:            string;
    createdBy?:             string;
    createdUser?:           ICreatedUser;
    deviceUUID?:            string;
    accountVoucherDetails?: AccountVoucherDetails[]
}

export class Voucher implements IVoucher{

    #_accountVoucherUUID:    string;
    #_docNo:                 string;
    #_totalAmount:           number;
    #_docDate:               Date;
    #_createdUser:           ICreatedUser;
    #_branchUUID:            string;

    constructor(data:IVoucher) {
        this.#_accountVoucherUUID  = data.accountVoucherUUID   
        this.#_docNo   = data.docNo                
        this.#_totalAmount = data.totalAmount          
        this.#_docDate = data.docDate              
        this.#_createdUser = data?.createdUser     
        this.#_branchUUID = data?.branchUUID      
    }

    public get docNo():string{
        return this.#_docNo
    }

    public get docDate():Date{
        return this.#_docDate
    }

    public get totalAmount():number{
        return this.#_totalAmount
    }

    public get createdBy():string{
        if(this.#_createdUser){
            let user:CreatedUser = new CreatedUser( this.#_createdUser)
            return user.name
        }
        return ''
    }

    public get accountVoucherUUID():string{
        return this.#_accountVoucherUUID
    }
    public get branchUUID():string{
        return this.#_branchUUID
    }


}