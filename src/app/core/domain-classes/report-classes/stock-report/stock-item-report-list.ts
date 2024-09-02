import { AccountHead } from "@core/domain-classes/account-head";
import { Product } from "@core/domain-classes/product";
import { Unit } from "@core/domain-classes/unit";

export interface StockItemReportList {
    accountObject:          AccountHead
    product:                Product;
    account:                string;
    transactionType:        number;
    transactionDate:        Date;
    transactionNo:          string;
    unit:                   Unit;
    documentNo:             string;
    transQuantity:          number;
    baseQuantity:           number;
    purchaseOuantity:       number;
    purchaseReturnOuantity: number;
    saleQuantity:           number;
    saleReturnQuantity:     number;
    rate:                   number;
    balance:                number;
    transactionDirection:   number;
    stockInQuantity:        number;
    stockOutQuantity:       number;
    damageQuantity:         number;

}
