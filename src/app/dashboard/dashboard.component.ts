import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetAnalyzer } from '@core/domain-classes/budget-analyzer.interface';
import { DashboardResourceParameter } from '@core/domain-classes/dashboard-resource-parameter';
import { IDevice } from '@core/domain-classes/device';
import { DateScope, DateScopeArray } from '@core/domain-classes/enums/date-scope.enum';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { FinancialSummary } from '@core/domain-classes/financial_summary.interface';
import { TopCustomers } from '@core/domain-classes/top-customers.interface';
import { TopSellingProducts } from '@core/domain-classes/top-selling-product.interface';
import { TopUsers } from '@core/domain-classes/top-users.interface';
import { CommonError } from '@core/error-handler/common-error';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { SignalrService } from '@core/services/signalr.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { GetDateRange } from '@shared/helpers/date-range.helper';
import { LoaderService } from '@shared/services/loader.service';
import { forkJoin } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  filterOptions = DateScopeArray;
  dateScope = DateScope
  dashboardFilterForm: FormGroup;
  devices: IDevice[];
  resourceParameter: DashboardResourceParameter
  topCustomers: TopCustomers[];
  topUsers: TopUsers[];
  topProducts: TopSellingProducts[];
  financialData: BudgetAnalyzer[];
  finacialSummaryCounts:FinancialSummary | CommonError;
  currentFinancialyear: FinancialYearInfo;
  disabledFilterOptions : string[] =[]
  branchUUID: any;
  constructor(
    private signalrService: SignalrService,
    private currentFinancialYearService: CurrentFinancialYearService,
    public translate: TranslationService,
    private fb: FormBuilder,
    private dashboardService:DashboardService,
    private loader:LoaderService
  ) {
    super();
    this.resourceParameter = new DashboardResourceParameter()
  }

  ngOnInit() {
    this.dashboardFilterForm = this.fb.group({
      branch:[''],
      device: [''],
      dateScope: [this.dateScope.TODAY],
    });
    this.getCurrentFinancialYear()

    this.dashboardFilterForm.valueChanges.pipe(startWith(this.dashboardFilterForm.getRawValue()), debounceTime(300)).subscribe((res: any) => {
      const dateScope = res.dateScope as DateScope;
      const { fromDate, toDate } = GetDateRange(dateScope,this.currentFinancialyear);
      this.resourceParameter = this.buildResourceParameters(fromDate, toDate);
      this.fetchDashboardData( this.resourceParameter);
    });
  }
  getCurrentFinancialYear() {
    this.sub$.sink = this.currentFinancialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
      this.currentFinancialyear = res
      if(this.currentFinancialyear.isCurrentFinancialYear){
        this.disabledFilterOptions = []
        return;
      }
      this.dashboardFilterForm.patchValue({
        dateScope: this.dateScope.THIS_FINANCIAL_YEAR
      })
      this.disabledFilterOptions = this.filterOptions.filter(e=>e.key!=this.dateScope.THIS_FINANCIAL_YEAR).map(({key})=>key)

    })
  }

  buildResourceParameters(fromDate: Date, toDate: Date) {
    const{branch,device}=this.dashboardFilterForm.getRawValue()
    return {
      branchUUID:branch,
      deviceUUID: device,
      fromDate,
      toDate
    };
  }



  fetchDashboardData(parameters: DashboardResourceParameter) {
    this.loader.show()
    forkJoin([
      this.dashboardService.getCounts(parameters),
      this.dashboardService.getTopCustomers(parameters),
      this.dashboardService.getTopUsers(parameters),
      this.dashboardService.getTopSellingProducts(parameters),
      this.dashboardService.getFinancialInsightsChartData(parameters)
    ]).subscribe(([counts, customers, users, products, financialData]) => {
      this.finacialSummaryCounts= counts;
      this.topCustomers = Array.isArray(customers) ? customers : [];
      this.topUsers = Array.isArray(users) ? users : [];
      this.topProducts = Array.isArray(products) ? products : [];
      this.financialData = Array.isArray(financialData) ? financialData : [];
      this.loader.hide();
    });
  }


  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.dashboardFilterForm.patchValue({
      device:''
    })
}
}

