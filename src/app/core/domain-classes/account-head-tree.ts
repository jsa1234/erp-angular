export interface AccountHeadTree{
    accountUUID:     string;
    accountCode:     string;
    accountType:     number;
    nameEnglish:     string;
    nameSecondLanguage:      string;
    accLevel:        number;
    accParentUUID:string
    openingBalance:       number;
    debitCredit:          number;
    accountChildren: AccountHeadTree[];
}
