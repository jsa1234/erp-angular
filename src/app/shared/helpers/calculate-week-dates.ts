import * as  dayjs from 'dayjs';

export function CalculateWeekDates(weekStart: number) {
  const currentDate = dayjs();
  const weekStartDay = currentDate.day(weekStart).startOf('day');
  const weekEndDay = weekStartDay.add(6, 'day');

  return {
    fromDate: weekStartDay.toDate(),
    toDate: weekEndDay.toDate(),
  };
}

export function CalculateMonthDates() {
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');

  return {
    fromDate: startOfMonth.toDate(),
    toDate: endOfMonth.toDate(),
  };
}


