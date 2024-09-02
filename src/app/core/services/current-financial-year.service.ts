import { Injectable } from '@angular/core';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentFinancialYearService {


  private _currentFinancialYearSubject$:BehaviorSubject<FinancialYearInfo> = new BehaviorSubject<FinancialYearInfo>(null)
  public currentFinancialYear$:Observable<FinancialYearInfo>  = this._currentFinancialYearSubject$.asObservable()


  constructor() {
    // Check if financial year exists in localStorage
    const storedFinancialYear = localStorage.getItem('financialYear');
    if (storedFinancialYear) {
      this._currentFinancialYearSubject$.next(JSON.parse(storedFinancialYear));
    }
  }

  setFinancialYear(financialYear: FinancialYearInfo) {
    // Store in localStorage
    localStorage.setItem('financialYear', JSON.stringify(financialYear));
    // Update BehaviorSubject
    this._currentFinancialYearSubject$.next(financialYear);
  }

  clearFinancialYear() {
    // Remove from localStorage
    localStorage.removeItem('financialYear');
    // Clear BehaviorSubject
    this._currentFinancialYearSubject$.next(null);
  }
}
