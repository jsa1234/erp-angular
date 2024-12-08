import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DamageEntryDataSource } from './damage-entry-datasource';
import { DamageEntryResourceParameter } from '@core/domain-classes/damage-entry-resource-parameter';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';
import { Router } from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';
import { environment } from '@environments/environment';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { DamageEntryService } from '../damage-entry.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-damage-entry-list',
  templateUrl: './damage-entry-list.component.html',
  styleUrls: ['./damage-entry-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DamageEntryListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _docNoFilter: string;
  displayedColumns: string[] = ['action', 'docDate', 'docNo','branch','grandTotal', 'remarks'];
  filterColumns: string[] = ['action-search', 'docDate-search', 'docNo-search','branch-search','grandTotal-search', 'remarks-search'];
  footerToDisplayed: string[] = ['footer'];
  dataSource: DamageEntryDataSource;
  damageEntryResource: DamageEntryResourceParameter;
  expandedElement: IDamageEntry | null;
  searchForm: FormGroup;
  branchUUID:string = '';
  isLoading$: boolean;
  defaultPageSize:number = environment.initialPageSize
  pageSizeOptions:number[] = environment.pageSizeOptions
  public filterObservable$: Subject<string> = new Subject<string>();

  public get docNoFilter(): string {
    return this._docNoFilter;
  }

  public set docNoFilter(v: string) {
    this._docNoFilter = v;
    const docNoFilter = `docNo:${v}`;
    this.filterObservable$.next(docNoFilter);
  }

  constructor(    
    private router:Router,
    private cd: ChangeDetectorRef,
    public translate: TranslationService,
    private loader:LoaderService,
    private fb: FormBuilder,
    private damageEntryService:DamageEntryService,
    private commonDialogService:CommonDialogService,
    private toastrService:ToastrService,
    private branchService:BranchService) 
    {
       super() 
       this.damageEntryResource = new DamageEntryResourceParameter();
       this.damageEntryResource.pageSize = this.defaultPageSize
       this.damageEntryResource.orderBy = 'docNo asc';
       this.damageEntryResource.branchUUID=''; 
       this.damageEntryResource.deviceUUID='';
    }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide()
    this.createSearchForm();
    this.onLoadData();
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      branchUUID:[''],
      deviceUUID: [''],
      fromDate:['',Validators.required],
      toDate :['',Validators.required]
    });
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  onSearchSubmit() {
    if (this.searchForm.invalid) { 
      this.searchForm.markAllAsTouched();
      return; }
      const formValues = this.searchForm.getRawValue()
      this.setDamageEntryResource(formValues)
        this.dataSource.loadData(this.damageEntryResource);
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.damageEntryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.damageEntryResource.pageSize = this.paginator.pageSize;
          this.damageEntryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.damageEntryResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.damageEntryResource.pageSize = c.pageSize;
          this.damageEntryResource.skip = c.skip;
          this.damageEntryResource.totalCount = c.totalCount;
        }
      });
  }



  toggleRow(element: IDamageEntry) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }


  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID:''
    })
}

setDamageEntryResource(formValues: any): void {
  this.damageEntryResource.fromDate = formValues.fromDate;
  this.damageEntryResource.toDate = formValues.toDate;
  this.damageEntryResource.deviceUUID = formValues.deviceUUID;
  this.damageEntryResource.branchUUID = formValues.branchUUID;
}
onLoadData()
{
  this.dataSource = new DamageEntryDataSource(this.damageEntryService);
  this.searchForm.valueChanges.pipe(
    skip(1), // Skip the first emission which happens on form initialization
    debounceTime(500), // Adjust the debounce time as needed
    first()).subscribe((formValues) => {
      this.setDamageEntryResource(formValues)
      this.dataSource.loadData(this.damageEntryResource);
  });
  this.getResourceParameter();
  this.sub$.sink = this.filterObservable$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged())
    .subscribe((c) => {
      this.damageEntryResource.skip = 0;
      const strArray: Array<string> = c.split(':');
      if (strArray[0] === 'docDate') {
        this.damageEntryResource.docDate =new Date(strArray[1]);
        if(isNaN(this.damageEntryResource.docDate.getTime()))
            {
              this.damageEntryResource.docDate = null;
            }
      } else if (strArray[0] === 'docNo') {
        this.damageEntryResource.docNo = strArray[1];
      }
      this.dataSource.loadData(this.damageEntryResource);
    });
}
deleteDamageEntry(damageEntry: IDamageEntry) {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translate.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.damageEntryService.deleteDamageEntry(damageEntry.damageUUID)
          .subscribe(() => {
            this.toastrService.success(this.translate.getValue('DAMAGE_ENTRY_DELETED_SUCCESSFULLY'));
            this.paginator.pageIndex = 0;
            this.dataSource.loadData(this.damageEntryResource);
          });
      }
    });
}

}
