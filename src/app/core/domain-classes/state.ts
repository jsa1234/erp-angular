import { Country } from "./country"

export interface State{
    nameEnglish:string
    nameSecondLanguage:string
    stateUUID:string
    countryUUID:string
    isUpdate:boolean
    isActive:boolean
    country?:Country
}