import {State} from '@core/domain-classes/state'
export interface District {
    districtId:   number;
    districtUUID: string;
    countryUUID: string;
    stateId:      number;
    stateUUID:    string;
    nameEnglish:  string;
    nameSecondLanguage:   string;
    states:       State;
    isUpdate?:    boolean
    isActive?:    boolean
}