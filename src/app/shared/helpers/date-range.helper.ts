import { DateScope } from "@core/domain-classes/enums/date-scope.enum";
import { environment } from "@environments/environment";
import { CalculateWeekDates, CalculateMonthDates } from "./calculate-week-dates";
import { FinancialYearInfo } from "@core/domain-classes/financial-year-info";

export function GetDateRange(dateScope: DateScope , financialYearData:FinancialYearInfo) {
    let fromDate: Date;
    let toDate: Date;
  
    switch (dateScope) {
      case DateScope.TODAY:
        fromDate = toDate = new Date();
        break;
      case DateScope.THIS_WEEK:
        const { fromDate: weekStartDate, toDate: weekEndDate } = CalculateWeekDates(environment.weekStart);
        fromDate = new Date(weekStartDate);
        toDate = new Date(weekEndDate);
        break;
      case DateScope.THIS_MONTH:
        const { fromDate: startOfMonth, toDate: endOfMonth } = CalculateMonthDates();
        fromDate = new Date(startOfMonth)
        toDate =new Date(endOfMonth)
        break;
      case DateScope.THIS_FINANCIAL_YEAR:
        const { startDate: financialYearStartDate, endDate: financialYearEndDate } = financialYearData;
        fromDate = new Date(financialYearStartDate);
        toDate = new Date(financialYearEndDate);
        break;
      default:
        fromDate = toDate = new Date();
        break;
    }
  
    return { fromDate, toDate };
  }