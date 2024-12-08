import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageSubCategoryComponent } from '../manage-sub-category/manage-sub-category.component';
import { MatPaginator } from '@angular/material/paginator';
import { SubcategoryResourceParameter } from '@core/domain-classes/masters/subcategory-resource-parameter';
import { SubCategoryDataSource } from '../sub-category-datasource';
import { SubCategoryService } from '../sub-category.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-sub-category-list-presentation',
  templateUrl: './sub-category-list-presentation.component.html',
  styleUrls: ['./sub-category-list-presentation.component.scss'],
})
export class SubCategoryListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  dataSource: SubCategoryDataSource;
  subCategoryResource: SubcategoryResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    
    'subcategoryEnglish',
    'category',
    // 'nameSecondLanguage',
    'code',
    'descriptionEnglish',
    'categoryStatus',
    'action',
    // 'descriptionSecondLanguage',
  ];
  displayedColumnsSearch: string[] = [
    'category-search',
    'subcategoryEnglish-search',
    // 'nameSecondLanguage',
    'code-search',
    'descriptionEnglish-search',
    'action-search',
    // 'descriptionSecondLanguage-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  _nameEnglishFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();
 public get NameEnglishFilter(): string {
    return this._nameEnglishFilter;
  }
  public set NameEnglishFilter(v: string) {
    this._nameEnglishFilter = v;
    const filter = `nameEnglish:${v}`;
    this.filterObservable$.next(filter);
  }
  @Output() deleteSubcategoryHandler: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private dialog: MatDialog,
    private subCategoryService: SubCategoryService,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private branchService: BranchService
  ) {
    super();
    this.subCategoryResource = new SubcategoryResourceParameter();
    this.subCategoryResource.pageSize = 10;
    this.subCategoryResource.orderBy = 'nameSecondLanguage asc';
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loadData();
  }

  loadData() {
    this.dataSource = new SubCategoryDataSource(this.subCategoryService);
    this.dataSource.loadData(this.subCategoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((c) => {
      this.subCategoryResource.skip = 0;
      const strArray: Array<string> = c.split(':');
      if (strArray[0] === 'nameEnglish') {
        this.subCategoryResource.nameEnglish =strArray[1];
      } 
      this.dataSource.loadData(this.subCategoryResource);
    });
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.subCategoryResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.subCategoryResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.subCategoryResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.subCategoryResource.pageSize = c.pageSize;
          this.subCategoryResource.skip = c.skip;
          this.subCategoryResource.totalCount = c.totalCount;
        }
      }
    );
  }
  manageSubCategory(subcategory: ProductSubcategory) {
    this.dialog
      .open(ManageSubCategoryComponent, {
        width: '750px',
        data: Object.assign({}, subcategory),
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        this.loadData();
      });
  }

  deleteSubCategory(subcategory: ProductSubcategory): void {
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == 'en'
            ? subcategory.nameEnglish
            : subcategory.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteSubcategoryHandler.emit(subcategory.subCategoryUUID);
        }
      });
  }
}