import { FinancialReport } from "./financial-report";

export class FYClosingDataTransmitter {
    #_data: FinancialReport;

    constructor(data: FinancialReport) {
        this.#_data = data;
    }

    public getModifiedData(): any {
        const modifiedData = {
            deviceUUID: this.#_data.device.deviceUUID,
            financialYearUUID: this.#_data.financialYear.financialYearUUID,
            accountClosings: this.getAccountClosings(),
            stockClosings: this.getStockClosings()
        };

        return modifiedData;
    }

    private getAccountClosings(): any[] {
        return this.#_data.financialYearAccounts.map(account => ({
            accountUUID: account.accountUUID,
            openingValue: account.deviceOpeningBalance,
            closingValue: account.deviceClosingBalance
        }));
    }


    private getStockClosings(): any[] {
        return [].concat(...this.#_data.financialYearStocks.map(stock =>
          stock.productPrices.map(productPrice => ({
            productUUID: stock.productUUID,
            productPriceUUID: stock.productPriceUUID,
            openingValue: productPrice.deviceOpeningBalance,
            closingValue: productPrice.deviceClosingBalance
          }))
        ));
      }
      
}
