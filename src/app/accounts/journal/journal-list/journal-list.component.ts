import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { IJournal } from '@core/domain-classes/journal';
import { JournalResourceParameter } from '@core/domain-classes/journal-resource-parameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  skip,
  tap,
} from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { JournalService } from '../journal.service';
import { JournalDataSource } from './journal.datasource';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class JournalListComponent extends BaseComponent implements OnInit {
  searchForm: FormGroup;
  filterForm: FormGroup;
  dataSource: JournalDataSource;
  displayedColumns: string[] = [
    'action',
    'docNo',
    'docDate',
    'totalCrAmount',
    'totalDrAmount',
  ];
  filterColumns: string[] = [
    'action-search',
    'journalNo-search',
    'journalDate-search',
    'totalCrAmount-search',
    'totalDrAmount-search',
  ];
  pageSizeOptions:number[];
  footerToDisplayed: string[] = ['footer'];
  isLoading$: boolean =false;
  journalResource: JournalResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: IJournal | null;
  branchUUID: any;


  constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService
  ) {
    super();
    this.journalResource = new JournalResourceParameter();
    this.journalResource.pageSize = environment.initialPageSize;
    this.journalResource.orderBy = 'docNo asc';
    this.pageSizeOptions = environment.pageSizeOptions

  }

  ngOnInit(): void {
    this.loaderShowOrHide()
    this.createSearchForm();
    this.createFilterForm();
    this.onLoadData();
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  onLoadData() {
    this.dataSource = new JournalDataSource(this.journalService);
    this.searchForm.valueChanges.pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()).subscribe(() => {
        const formValues = this.searchForm.getRawValue();
        this.setJournalResource(formValues)
        this.dataSource.loadData(this.journalResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(),skip(1))
      .subscribe(() => {
        const formValues = this.filterForm.getRawValue()
        this.journalResource.skip = 0;
          this.journalResource.journalDate = formValues.journalDate
          this.journalResource.journalNo = formValues.journalNo
        this.dataSource.loadData(this.journalResource);
      });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      branch: [''],
      device: [''],
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
    });
  }

  createFilterForm():void{
    this.filterForm = this.fb.group({
      journalDate:[''],
      journalNo:['']
    })
  }

  onSearch(){
    if(!this.searchForm.valid){
      this.searchForm.markAllAsTouched()
      return;
    }
    const formValues = this.searchForm.getRawValue()
    this.setJournalResource(formValues)
    this.dataSource.loadData(this.journalResource);
  }
  setJournalResource(formValues: any): void {
    this.journalResource.fromDate = formValues.fromDate;
    this.journalResource.toDate = formValues.toDate;
    this.journalResource.device = formValues.device;
    this.journalResource.branch = formValues.branch;
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.journalResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.journalResource.pageSize = this.paginator.pageSize;
          this.journalResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.journalResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.journalResource.pageSize = c.pageSize;
          this.journalResource.skip = c.skip;
          this.journalResource.totalCount = c.totalCount;
        }
      }
    );
  }

  toggleRow(element: IJournal) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}

deleteJournal(voucher: IJournal) {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.journalService.deleteJournal(voucher.journalUUID)
          .subscribe(() => {
            this.toastrService.success(this.translationService.getValue('Journal Deleted Successfully'));
            this.paginator.pageIndex = 0;
            const formValues = this.filterForm.getRawValue();
            this.journalResource.journalDate = formValues.journalDate;
            this.journalResource.journalNo = formValues.journalNo;
            this.dataSource.loadData(this.journalResource);
          });
      }
    });
}
removeDate():void{
  this.filterForm.get('journalDate').reset()
}
}
