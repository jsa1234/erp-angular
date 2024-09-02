import { environment } from "@environments/environment"

export class CurrencyInfo{
    #_currencyCode:string = environment.currency
    #_dispaly:string = 'symbol'
    #_digitsInfo:string = '0.2-2'

    constructor() {
    }
public get currencyCode():string{
    return this.#_currencyCode
}
public get dispaly():string{
    return this.#_dispaly
}
public get digitsInfo():string{
    return this.#_digitsInfo
}

}
