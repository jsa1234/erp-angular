export class Tax {
    taxUUID:                    string;
    taxId:                      number;
    nameEnglish:                string;
    nameSecondLanguage:         string;
    code:                       string;
    percentage:                 number;
    branchUUID:                 string;
    isActive:                   boolean;
    cgst:                       number;
    sgst:                       number;
    igst:                       number;
    taxType:                    number;
    taxBehaviour:               number;
    saleMappingAccountUUID:     string;
    purchaseMappingAccountUUID: string;
    taxValidFrom:               Date;
    taxValidTo:                 Date;
    applicableB2C:              boolean;
    applicableB2B:              boolean;
    applicableB2CIS:            boolean;
    applicableB2BIS:            boolean;
    isGlobal:                   boolean;
    taxTypeName:                string;
    taxBehaviourName:           string;
}