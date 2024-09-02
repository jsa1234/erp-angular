import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { catchError } from 'rxjs/operators';
import { DashboardResourceParameter } from '@core/domain-classes/dashboard-resource-parameter';
import { TopCustomers } from '@core/domain-classes/top-customers.interface';
import { FinancialSummary } from '@core/domain-classes/financial_summary.interface';
import { TopUsers } from '@core/domain-classes/top-users.interface';
import { TopSellingProducts } from '@core/domain-classes/top-selling-product.interface';
import { BudgetAnalyzer } from '@core/domain-classes/budget-analyzer.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService
  ) {}

  private createCustomParams(resourceParams: DashboardResourceParameter): HttpParams {
    return new HttpParams()
      .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
      .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID : '');
  }
  
  private getDashboardData<T>(url: string, resourceParams: DashboardResourceParameter): Observable<T | CommonError> {
    const customParams = this.createCustomParams(resourceParams);
    return this.http.get<T>(url, { params: customParams })
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }
  
  getCounts(resourceParams: DashboardResourceParameter): Observable<FinancialSummary | CommonError> {
  const url = 'Dashboard/GetCounts';
  return this.getDashboardData<FinancialSummary>(url, resourceParams);
}


getTopCustomers(resourceParams: DashboardResourceParameter): Observable<TopCustomers[] | CommonError> {
  const url = 'Dashboard/GetTopCustomers';
  return this.getDashboardData<TopCustomers[]>(url, resourceParams);
}

getTopUsers(resourceParams: DashboardResourceParameter): Observable<TopUsers | CommonError> {
  const url = 'Dashboard/GetTopUsers';
  return this.getDashboardData<TopUsers>(url, resourceParams);
}

getTopSellingProducts(resourceParams: DashboardResourceParameter): Observable<TopSellingProducts | CommonError> {
  const url = 'Dashboard/GetTopSellingProducts';
  return this.getDashboardData<TopSellingProducts>(url, resourceParams);
}

getFinancialInsightsChartData(resourceParams: DashboardResourceParameter): Observable<BudgetAnalyzer | CommonError> {
  const url = 'Dashboard/GetFinancialInsightsChartData';
  return this.getDashboardData<BudgetAnalyzer>(url, resourceParams);
}

}
