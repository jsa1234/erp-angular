import { AccountDetails } from "../account-details.interface";
import { LedgerReportDataList } from "./ledger-report-detail-list";


export class StatementOfAccount{
    accountDetails:       AccountDetails;
    fromDate:             Date;
    toDate:               Date;
    accountUUID:          string;
    totalDebits:          number;
    totalCredits:         number;
    absoluteByBalance:    number;
    absoluteToBalance:    number;
    ledgerReportDataList: LedgerReportDataList[];
}
