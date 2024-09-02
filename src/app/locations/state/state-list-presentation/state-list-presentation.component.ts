import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { ManageStateComponent } from '../manage-state/manage-state.component';
import { State } from '@core/domain-classes/state';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { MatPaginator } from '@angular/material/paginator';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';
import { StateDataSource } from '../state-datasource';
import { StateService } from '../state.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-state-list-presentation',
  templateUrl: './state-list-presentation.component.html',
  styleUrls: ['./state-list-presentation.component.scss'],
})
export class StateListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: StateDataSource;
  stateResource: LocationsResourceParameter;
  @Output() deleteStateHandler: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private stateService: StateService
  ) {
    super();
    this.stateResource = new LocationsResourceParameter();
    this.stateResource.pageSize = 10;
  }
  displayedColumns: string[] = [
    'action',
    'country',
    'nameEnglish',
    // 'nameArab'
  ];
  footerToDisplayed: string[] = ['footer'];

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.dataSource = new StateDataSource(this.stateService);
    this.dataSource.loadData(this.stateResource);
    this.getResourceParameter();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.stateResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.stateResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.stateResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.stateResource.pageSize = c.pageSize;
          this.stateResource.skip = c.skip;
          this.stateResource.totalCount = c.totalCount;
        }
      }
    );
  }
  deleteState(state: State): void {
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${areU} :: ${
          this.translationService.getSelectedLanguage() == 'en'
            ? state.nameEnglish
            : state.nameSecondLanguage
        }`
      )
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteStateHandler.emit(state.stateUUID);
        }
      });
  }

  manageState(state: State) {
    this.dialog
      .open(ManageStateComponent, {
        width: '450px',
        data: Object.assign({}, state),
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.loadData();
      });
  }
}
