import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BranchDataSource } from './branch-datasource';
import { IBranch } from '@core/domain-classes/branch';
import { BranchResourceParameter } from '@core/domain-classes/branch-resource-parameter';
import { environment } from '@environments/environment';
import { Observable, Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from '../branch.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import {
  BranchType,
  BranchTypeArray,
  BranchTypeMapping,
} from '@core/domain-classes/enums/branch-type.enum';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
})
export class BranchListComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('matMenuTrigger') matMenuTrigger: MatMenuTrigger;
  isLoading$: boolean;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if Ctrl key is pressed and the period key is pressed
    if (event.ctrlKey && event.key === '.') {
      // Open the Mat Menu
      this.matMenuTrigger.openMenu();
    }
  }

  dataSource: BranchDataSource;
  branches: IBranch[] = [];
  displayedColumns: string[] = [
    'action',
    'nameEnglish',
    // 'nameSecondLanguage',
    'branchType',
    'gstNo',
    // 'regNo',
    'mobileNo',
    'phoneNo',
    'district',
    // 'state',
    // 'country',
  ];
  displayedColumnsSearch: string[] = [
    'action-search',
    'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'branchType-search',
    'gstNo-search',
    // 'regNo-search',
    'mobileNo-search',
    'phoneNo-search',
    'district-search',
    // 'state-search',
    // 'country-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  branchResource: BranchResourceParameter;
  loading$: Observable<boolean>;
  pageSizeOptions: number[] = environment.pageSizeOptions;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _nameEnglishFilter: string;
  _nameSecondLanguageFilter: string;
  _branchTypeFilter: number;
  branchTypeList: BranchTypeMapping[] = BranchTypeArray;
  public filterObservable$: Subject<string> = new Subject<string>();

  public get NameEnglishFilter(): string {
    return this._nameEnglishFilter;
  }
  public set NameEnglishFilter(v: string) {
    this._nameEnglishFilter = v;
    const filter = `nameEnglish:${v}`;
    this.filterObservable$.next(filter);
  }
  public get NameSecondLanguageFilter(): string {
    return this._nameSecondLanguageFilter;
  }
  public set NameSecondLanguageFilter(v: string) {
    this._nameSecondLanguageFilter = v;
    const filter = `nameSecondLanguage:${v}`;
    this.filterObservable$.next(filter);
  }

  public get BranchTypeFilter(): number {
    return this._branchTypeFilter;
  }
  public set BranchTypeFilter(v: number) {
    this._branchTypeFilter = v;
    const filter = `branchTypeFilter:${v}`;
    this.filterObservable$.next(filter);
  }

  constructor(
    public translationService: TranslationService,
    private branchService: BranchService,
    private router: Router,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private loader:LoaderService
  ) {
    super();
    this.branchResource = new BranchResourceParameter();
    this.branchResource.pageSize = environment.initialPageSize;
    this.branchResource.orderBy = 'nameEnglish asc';
  }
  ngOnInit(): void {
    this.loaderShowOrHide()
    this.getAllBranches();
  }

  getAllBranches(): void {
    this.dataSource = new BranchDataSource(this.branchService);
    this.dataSource.loadData(this.branchResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.branchResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'nameEnglish') {
          this.branchResource.nameEnglish = strArray[1];
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.branchResource.nameSecondLanguage = strArray[1];
        } else if (strArray[0] === 'branchTypeFilter') {
          this.branchResource.branchType = strArray[1]?+strArray[1]:null;
        }
        this.dataSource.loadData(this.branchResource);
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.branchResource.pageSize = c.pageSize;
          this.branchResource.skip = c.skip;
          this.branchResource.totalCount = c.totalCount;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.branchResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.branchResource.pageSize = this.paginator.pageSize;
          this.branchResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.branchResource);
        })
      )
      .subscribe();
  }

  mangeBranch(id: string, branchId: string) {
    this.router.navigate(['/branch/manage/', id], {
      queryParams: { branchId: branchId },
    });
  }

  deleteBranch(branch: IBranch) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${branch.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.branchService
            .deleteBranch(branch.branchUUID)
            .subscribe(() => {
              this.toastrService.success(
                this.translationService.getValue('RESPONSE_MESSAGE.BRANCH_DELETED_SUCCESSFULLY')
              );
              this.paginator.pageIndex = 0;
              this.branchResource.nameEnglish = '';
              this.dataSource.loadData(this.branchResource);
            });
        }
      });
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }


  getBranchTypeString(branchType:BranchType): string {
    if(branchType == null || branchType == undefined)return ''
    const branch= this.branchTypeList.find(item => item.key === branchType);
    return branch.valueEnglish || ''
  }
}
