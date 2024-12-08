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
import { Unit } from '@core/domain-classes/unit';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageUnitComponent } from '../manage-unit/manage-unit.component';
import { UnitDataSource } from '../unit-datasource';
import { UnitResourceParameter } from '@core/domain-classes/masters/unit-resource-parameter';
import { MatPaginator } from '@angular/material/paginator';
import { UnitService } from '../unit.service';
import { tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-unit-list-presentation',
  templateUrl: './unit-list-presentation.component.html',
  styleUrls: ['./unit-list-presentation.component.scss'],
})
export class UnitListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  dataSource: UnitDataSource;
  unitResource: UnitResourceParameter;
  displayedColumns: string[] = [
    'nameEnglish',
    // 'nameSecondLanguage',
    'code',
    'action',
  ];
  footerToDisplayed: string[] = ['footer'];
  @Output() deleteUnitHandler: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private unitService: UnitService,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private branchService: BranchService
  ) {
    super();
    this.unitResource = new UnitResourceParameter();
    this.unitResource.pageSize = 10;
    this.unitResource.orderBy='nameEnglish asc';
  }
  

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loadData();
  }

  deleteUnit(unit: Unit): void {
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == 'en'
            ? unit.nameEnglish
            : unit.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteUnitHandler.emit(unit.unitUUID);
        }
      });
  }
  loadData() {
    this.dataSource = new UnitDataSource(this.unitService);
    this.dataSource.loadData(this.unitResource);
    this.getResourceParameter();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.unitResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.unitResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.unitResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.unitResource.pageSize = c.pageSize;
          this.unitResource.skip = c.skip;
          this.unitResource.totalCount = c.totalCount;
        }
      }
    );
  }
  manageUnit(unit: Unit): void {
    this.dialog
      .open(ManageUnitComponent, {
        width: '350px',
        data: Object.assign({}, unit),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }
}
