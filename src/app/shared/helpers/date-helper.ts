import { Months } from "@core/domain-classes/enums/month.enum";
import { MonthRange } from "@core/domain-classes/month-range.interface";
import * as dayjs from "dayjs";


export function GetMonthNames():string[]{
  return Object.values(Months).filter(value => typeof value === 'string') as string[];
}

export function  getFinancialYearMonths(
  financialYearStartDate: Date,
  financialYearEndDate: Date
): MonthRange[] {
  const months: MonthRange[] = [];
  let currentMonthStartDate = dayjs(financialYearStartDate).startOf('month');
  const financialYearEnd = dayjs(financialYearEndDate).endOf('month');

  while (currentMonthStartDate.isAfter(financialYearEnd) === false) {
    const currentMonthEndDate = currentMonthStartDate.endOf('month');
    const monthName = currentMonthStartDate.format('MMMM');
    months.push({
      month: monthName,
      startDate: currentMonthStartDate,
      endDate: currentMonthEndDate,
    });
    currentMonthStartDate = currentMonthStartDate.add(1, 'month');
  }

  return months;
}

export function getSelectedMonthDates(
  financialYearStartDate: Date,
  financialYearEndDate: Date,
  selectedMonth: string
): MonthRange | null {
  const monthsWithinFinancialYear = getFinancialYearMonths(
    financialYearStartDate,
    financialYearEndDate
  );
  const selectedMonthData = monthsWithinFinancialYear.find(
    (month) => month.month.toUpperCase() === selectedMonth.toUpperCase()
  );
  return selectedMonthData || null;
}


export function generateQuarterlyMonths(startMonth) {
  const Months = GetMonthNames();

  const financialYearStartIndex = Months.findIndex(month => month.toUpperCase() === startMonth.toUpperCase());
  if (financialYearStartIndex === -1) {
    throw new Error('Invalid start month provided.');
  }

  const quarters = [];
  for (let i = 0; i < 4; i++) {
    const startMonthIndex = (financialYearStartIndex + i * 3) % 12;
    const endMonthIndex = (startMonthIndex + 2) % 12;
    const quarter = `${Months[startMonthIndex]} - ${Months[endMonthIndex]}`;
    quarters.push(quarter);
  }

  return quarters;
}


export function generateMonths(startMonth: string): string[] {
  const monthsArray: string[] = GetMonthNames()

  const startMonthIndex: number = monthsArray.findIndex(month => month.toUpperCase() === startMonth.toUpperCase());
  if (startMonthIndex === -1) {
    throw new Error('Invalid start month. Please provide a valid month.');
  }

  const orderedMonths: string[] = [
    ...monthsArray.slice(startMonthIndex),
    ...monthsArray.slice(0, startMonthIndex),
  ];

  return orderedMonths;
}
