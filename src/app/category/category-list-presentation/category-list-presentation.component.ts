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
import { ProductCategory } from '@core/domain-classes/product-category';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../category.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { CategoryDataSource } from '../category-datasource';
import { CategoryResourceParameter } from '@core/domain-classes/masters/category-resource-parameter';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-list-presentation',
  templateUrl: './category-list-presentation.component.html',
  styleUrls: ['./category-list-presentation.component.scss'],
})
export class CategoryListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() deleteCategoryHandler: EventEmitter<string> =
    new EventEmitter<string>();
intilaPageSize:number = environment.initialPageSize
  dataSource: CategoryDataSource;
  categoryResource: CategoryResourceParameter;
  displayedColumns: string[] = [
    'action',
    'nameEnglish',
    // 'nameSecondLanguage',
    'code',
    'descriptionEnglish',
    // 'descriptionSecondLanguage',
  ];
  displayedColumnsSearch: string[] = [
    'action-search',
    'nameEnglish-search',
    // 'nameSecondLanguage',
    'code-search',
    'descriptionEnglish-search',
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
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private categoryService: CategoryService,
    public translationService: TranslationService
  ) {
    super();
    this.categoryResource = new CategoryResourceParameter();
    this.categoryResource.pageSize = 10;
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.dataSource = new CategoryDataSource(this.categoryService);
    this.dataSource.loadData(this.categoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((c) => {
      this.categoryResource.skip = 0;
      const strArray: Array<string> = c.split(':');
      if (strArray[0] === 'nameEnglish') {
        this.categoryResource.nameEnglish =strArray[1];
      } 
      this.dataSource.loadData(this.categoryResource);
    });
  }
  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.categoryResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.categoryResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.categoryResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.categoryResource.pageSize = c.pageSize;
          this.categoryResource.skip = c.skip;
          this.categoryResource.totalCount = c.totalCount;
        }
      }
    );
  }
  manageCategory(category: ProductCategory) {
    this.dialog
      .open(ManageCategoryComponent, {
        width: '350px',
        data: Object.assign({}, category),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }

  deleteCategory(category: ProductCategory): void {
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == 'en'
            ? category.nameEnglish
            : category.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteCategoryHandler.emit(category.categoryUUID);
        }
      });
  }
}
