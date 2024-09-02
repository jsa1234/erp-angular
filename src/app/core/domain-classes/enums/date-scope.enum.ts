export enum DateScope{
  TODAY = 'Today',
  THIS_WEEK = 'This Week',
  THIS_MONTH = 'This Month',
  THIS_FINANCIAL_YEAR = 'This Financial Year'
}

export const DateScopeArray = [
  { key: DateScope.TODAY, valueEnglish: 'Today', valueArabic: 'اليوم'  },
  { key: DateScope.THIS_WEEK, valueEnglish: 'This Week', valueArabic: 'هذا الاسبوع'  },
  { key: DateScope.THIS_MONTH, valueEnglish: 'This Month', valueArabic: 'هذا الشهر'  },
  { key: DateScope.THIS_FINANCIAL_YEAR, valueEnglish: 'This Financial Year', valueArabic: 'هذه السنة المالية'  }
];