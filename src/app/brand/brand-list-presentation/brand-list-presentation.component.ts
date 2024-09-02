import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Brand } from '@core/domain-classes/brand';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageBrandComponent } from '../manage-brand/manage-brand.component';
import { BrandDataSource } from '../brand-datasource';
import { BrandResourceParameter } from '@core/domain-classes/masters/brand-resource-parameter';
import { MatPaginator } from '@angular/material/paginator';
import { BrandService } from '../brand.service';
import { tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';

@Component({
  selector: 'app-brand-list-presentation',
  templateUrl: './brand-list-presentation.component.html',
  styleUrls: ['./brand-list-presentation.component.scss'],
})
export class BrandListPresentationComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() deleteBrandHandler: EventEmitter<string> =
    new EventEmitter<string>();

  dataSource: BrandDataSource;
  brandResource: BrandResourceParameter;
  displayedColumns: string[] = [
    'Action',
    'nameEnglish',
    // 'nameSecondLanguage',
    'code',
    'descriptionEnglish',
    // 'descriptionSecondLanguage',
  ];
  footerToDisplayed: string[] = ['footer'];

  constructor(
    private dialog: MatDialog,
    private brandService: BrandService,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService
  ) {
    super();
    this.brandResource = new BrandResourceParameter();
    this.brandResource.pageSize = 10;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataSource = new BrandDataSource(this.brandService);
    this.dataSource.loadData(this.brandResource);
    this.getResourceParameter();
  }
  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.brandResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.brandResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.brandResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.brandResource.pageSize = c.pageSize;
          this.brandResource.skip = c.skip;
          this.brandResource.totalCount = c.totalCount;
        }
      }
    );
  }
  deleteBrand(brand: Brand): void {
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${areU} :: ${brand.nameEnglish}`)
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteBrandHandler.emit(brand.brandUUID);
        }
      });
  }

  manageBrand(brand: Brand) {
    this.dialog
      .open(ManageBrandComponent, {
        width: '350px',
        data: Object.assign({}, brand),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }
}
