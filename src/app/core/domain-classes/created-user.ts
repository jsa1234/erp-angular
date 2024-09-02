export interface ICreatedUser{
    userId?:            number;
    userUUID?:          string;
    branchId?:          null;
    branchUUID?:        null;
    firstName?:         string;
    lastName?:          string;
    mobileCountryCode?: string;
    mobile?:            string;
    email?:             null;
    imagePath?:         null;
}

export class CreatedUser implements ICreatedUser{
    #_firstName:string
    #_lastName:string
    #_userUUID:string
    constructor(data:ICreatedUser) {
        this.#_firstName = data?.firstName
        this.#_lastName = data?.lastName
        this.#_userUUID = data.userUUID
    }

    public get name():string{
        return `${this.#_firstName} ${this.#_lastName}`
    }

    public get userUUID():string{
        return this.#_userUUID
    }
}