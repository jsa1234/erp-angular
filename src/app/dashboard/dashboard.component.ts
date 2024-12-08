import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { DashboardService } from './dashboard.service';
import { SecurityService } from '@core/security/security.service';
import { BranchService } from '../branch/branch.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit,OnDestroy {
  startDate: Date;
  endDate: Date;
  todayDate:Date;
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
  revenueData:any[];
  avgSales:any[];
  returns:any[];
  private destroy$ = new Subject<void>();
  constructor(
    private signalrService: SignalrService,
    private currentFinancialYearService: CurrentFinancialYearService,
    public translate: TranslationService,
    private fb: FormBuilder,
    private dashboardService:DashboardService,
    private loader:LoaderService,
    private securityService:SecurityService,
    private branchService:BranchService
  ) {
    super();
    this.resourceParameter = new DashboardResourceParameter()
  }

  ngOnInit() {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.branchService.branchUUIDSubject$.pipe(takeUntil(this.destroy$)).subscribe(uuid=>{
      this.branchUUID=uuid;
    });
    const today = new Date();
    this.startDate = today;
    this.endDate = today;
    this.todayDate= today;
    this.dashboardFilterForm = this.fb.group({
      branch:[''],
      device: [''],
      dateScope: [this.dateScope.TODAY],
      dateRange: this.fb.group({
        start: [this.startDate],  // Start date for date picker
        end: [this.endDate],    // End date for date picker
      }),
    });
    this.dashboardFilterForm.get('dateRange')?.valueChanges.subscribe((dateRange: any) => {
      const { start, end } = dateRange;
      if (start && end) {
        this.startDate = start;
        this.endDate = end;
      }
    });
    this.getCurrentFinancialYear()

    this.dashboardFilterForm.valueChanges.pipe(startWith(this.dashboardFilterForm.getRawValue()),
     debounceTime(300)).subscribe((res: any) => {
      const dateScope = res.dateScope as DateScope;
      const { fromDate, toDate } = GetDateRange(dateScope,this.currentFinancialyear);
      this.resourceParameter = this.buildResourceParameters(this.startDate,  this.endDate);
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
    let{branch,device}=this.dashboardFilterForm.getRawValue()
    branch=this.branchUUID;
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
     // this.dashboardService.getCounts(parameters),
     // this.dashboardService.getTopCustomers(parameters),
      //this.dashboardService.getTopUsers(parameters),
      this.dashboardService.getAverageSales(parameters),
      //this.dashboardService.getTopSellingProducts(parameters),
      this.dashboardService.getReturns(parameters),
      this.dashboardService.getRevenue(parameters),
     // this.dashboardService.getFinancialInsightsChartData(parameters)
     this.dashboardService.getFinancialInsights(parameters)
    ]).subscribe(([ sales, returns,revenues, financialData]) => {
     // this.finacialSummaryCounts= counts;
     // this.topCustomers = Array.isArray(customers) ? customers : [];
      //this.topUsers = Array.isArray(users) ? users : [];
      this.avgSales = sales ? sales : [];
      this.returns = returns ? returns : [];
      this.revenueData = revenues ? revenues : [];
      this.financialData = financialData ? financialData : [];
      this.loader.hide();
    });
  }


  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.dashboardFilterForm.patchValue({
      device:''
    })
}
onDateChange(evt:any){
const selectedDate = evt.value;
if (!this.startDate || (this.startDate && this.endDate)) {
  this.startDate = selectedDate;

}
else if (!this.endDate){
  this.endDate = selectedDate;
}
console.log("start",this.startDate,"end",this.endDate);
}
isTodayRange(): boolean {
  // Extract year, month, and day components for all dates
  const todayYear = this.todayDate.getFullYear();
  const todayMonth = this.todayDate.getMonth();
  const todayDay = this.todayDate.getDate();

  const startYear = this.startDate?.getFullYear();
  const startMonth = this.startDate?.getMonth();
  const startDay = this.startDate?.getDate();

  const endYear = this.endDate?.getFullYear();
  const endMonth = this.endDate?.getMonth();
  const endDay = this.endDate?.getDate();

  // Compare only year, month, and day (ignoring time)
  return (
    startYear === todayYear &&
    startMonth === todayMonth &&
    startDay === todayDay &&
    endYear === todayYear &&
    endMonth === todayMonth &&
    endDay === todayDay
  );
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}

