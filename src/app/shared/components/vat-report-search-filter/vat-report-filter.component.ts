import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsolidatedTaxCessReport } from '@core/domain-classes/consolidated-tax-cess-report.interface';
import { ITaxDetailedReport } from '@core/domain-classes/detailed-vat-report';
import { ReportType } from '@core/domain-classes/enums/report-type';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { SearchResponse } from '@core/domain-classes/search-response';
import { ITaxSummaryReport } from '@core/domain-classes/tax-summary-report';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { environment } from '@environments/environment';
import { generateMonths, generateQuarterlyMonths, getSelectedMonthDates } from '@shared/helpers/date-helper';
import { BaseComponent } from 'src/app/base.component';
@Component({
  selector: 'vat-report-filter',
  templateUrl: './vat-report-filter.component.html',
  styleUrls: ['./vat-report-filter.component.scss'],
})
export class VatReportFilterComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Output() searchActionHandler: EventEmitter<SearchResponse> =
    new EventEmitter<SearchResponse>();
  @Output() pdfActionHandler: EventEmitter<void> = new EventEmitter<void>();
  @Output() excelActionHandler: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearActionHandler: EventEmitter<void> = new EventEmitter<void>();

  @Input() summaryData: ConsolidatedTaxCessReport;
  @Input() inputData: ITaxDetailedReport;
  @Input() outputData: ITaxDetailedReport;

  searchForm: FormGroup;
  reportType = ReportType;
  monthsArray: string[];
  isDisabled: boolean = false;
  financialYearMonth = environment.financialYear;
  searchResponse: SearchResponse;
  label: string;
  summaryShow: ConsolidatedTaxCessReport;
  inputShow: number;
  outputShow: number;
  currentFinancialYear: FinancialYearInfo;
  startFinancialYear: number;
  endFinancialYear: number;
  branchUUID: any;
  constructor(
    private fb: FormBuilder,
    private currentFinancialYearService: CurrentFinancialYearService
  ) {
    super();
    this.searchResponse = new SearchResponse();
  }

  ngOnInit(): void {
    this.getFInancialYear();
    this.searchForm = this.fb.group({
      device: [''],
      branch: [''],
      reportType: ['', Validators.required],
      selectMonth: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['summaryData'] ||
      changes['inputData'] ||
      changes['outputData']
    ) {
      this.summaryShow = this.summaryData;
      this.inputShow = this.inputData?.taxSlabs?.length;
      this.outputShow = this.outputData?.taxSlabs?.length;
    }
  }
  get reportTypes() {
    return this.searchForm.get('reportType');
  }
  get selectMonth() {
    return this.searchForm.get('selectMonth');
  }

  onSearch() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const { device,branch, reportType, selectMonth } = this.searchForm.value;

    this.searchResponse.deviceUuid = device;
    this.searchResponse.reportType = reportType;
    this.searchResponse.branchUuid = branch;
    if (reportType == 0) {
      const getSelectedMonthDateRage = getSelectedMonthDates(this.currentFinancialYear.startDate,this.currentFinancialYear.endDate,selectMonth);
      this.searchResponse.fromDate = getSelectedMonthDateRage.startDate.toDate();
      this.searchResponse.toDate = getSelectedMonthDateRage.endDate.toDate();
    } else if (reportType == 1) {
      const monthNames = selectMonth.split(' - ');
      const firstMonthDateRage = getSelectedMonthDates(this.currentFinancialYear.startDate,this.currentFinancialYear.endDate,monthNames[0]);
      const lastMonthDateRage = getSelectedMonthDates(this.currentFinancialYear.startDate,this.currentFinancialYear.endDate,monthNames[1]);
      this.searchResponse.fromDate = firstMonthDateRage.startDate.toDate();
      this.searchResponse.toDate = lastMonthDateRage.endDate.toDate();
    } else {
      this.searchResponse.fromDate = new Date(this.currentFinancialYear.startDate);
      this.searchResponse.toDate = new Date(this.currentFinancialYear.endDate);
    }

    this.searchActionHandler.emit(this.searchResponse);
  }
  generatePdf() {
    this.pdfActionHandler.emit();
  }
  generateExcel() {
    this.excelActionHandler.emit();
  }

  getMonths(reportType: string) {
    this.monthsArray = [];
    this.searchForm.patchValue({ selectMonth: '' });
    this.searchForm.markAsUntouched();
    switch (+reportType) {
      case 0:
        this.monthsArray = generateMonths(this.financialYearMonth.toUpperCase())
        this.selectMonth.enable();
        break;

      case 1:
        this.monthsArray = generateQuarterlyMonths(this.financialYearMonth.toUpperCase())
        this.selectMonth.enable();
        break;

      case 2:
        this.monthsArray = [`${this.currentFinancialYear.year}`];
        this.searchForm.patchValue({ selectMonth: this.monthsArray[0] });
        this.label = 'Current Year';
        this.selectMonth.disable();
        break;
      default:
        break;
    }
  }

  clear() {
    this.searchForm.patchValue({
      device: '',
      reportType: '',
      selectMonth: '',
    });
    this.searchForm.markAsUntouched();
    this.monthsArray = [];
    this.searchResponse = new SearchResponse();
    this.selectMonth.enable();
    this.clearActionHandler.emit();
  }

  getFInancialYear() {
    this.sub$.sink = this.currentFinancialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
      this.currentFinancialYear = res
      this.financialYearMonth = new Date(res.startDate).toLocaleString('default',{month:'long'})
    })
  }


  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}
}
