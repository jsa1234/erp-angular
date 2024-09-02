import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IDevice } from '@core/domain-classes/device';
import { DeviceResourceParameter } from '@core/domain-classes/device-resource-parameter';
import { DeviceActivationStatus } from '@core/domain-classes/enums/device-activation-status';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../device.service';
import { ManageDeviceComponent } from '../manage-device/manage-device.component';
import { DeviceListDataSource } from './device-list-datasource';
import { LoaderService } from '@shared/services/loader.service';
import { LostDeviceComponent } from '../lost-device/lost-device.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent extends BaseComponent implements OnInit {
  dataSource: DeviceListDataSource;
  deviceStatus = DeviceActivationStatus;
  isLoading$: boolean = false;
  displayedColumns = [
    'action',
    'nameEnglish',
    // 'nameSecondLanguage',
    'deviceType',
    'deviceCode',
    'deviceIdentifier',
    'modelNo',
    'actStatus',
    'installationDate',
  ];
  searchHeader: string[] = [
    'action-search',
    'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'deviceType-search',
    'deviceCode-search',
    'deviceIdentifier-search',
    'modelNo-search',
    'actStatus-search',
    'installationDate-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  deviceResource: DeviceResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _nameEnglishFilter: string;
  _nameArabicFilter: string;
  _deviceIdentifierFilter: string;
  _modelNoFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();

  //#region getter
  public get NameEnglishFilter(): string {
    return this._nameEnglishFilter;
  }
  public get NameArabicFilter(): string {
    return this._nameArabicFilter;
  }
  public get DeviceIdentifierFilter(): string {
    return this._deviceIdentifierFilter;
  }
  public get ModelNoFilter(): string {
    return this._modelNoFilter;
  }
  //#endregion getter

  //#region setter
  public set NameEnglishFilter(v: string) {
    this._nameEnglishFilter = v;
    const filter = `nameEnglish:${v}`;
    this.filterObservable$.next(filter);
  }
  public set NameArabicFilter(v: string) {
    this._nameArabicFilter = v;
    const filter = `nameSecondLanguage:${v}`;
    this.filterObservable$.next(filter);
  }
  public set DeviceIdentifierFilter(v: string) {
    this._deviceIdentifierFilter = v;
    const filter = `deviceIdentifier:${v}`;
    this.filterObservable$.next(filter);
  }
  public set ModelNoFilter(v: string) {
    this._modelNoFilter = v;
    const filter = `modelNo:${v}`;
    this.filterObservable$.next(filter);
  }
  //#endregion setter

  constructor(
    private deviceService: DeviceService,
    public translationService: TranslationService,
    private dialog: MatDialog,
    private loader: LoaderService
  ) {
    super();
    this.deviceResource = new DeviceResourceParameter();
    this.deviceResource.pageSize = 20;
    this.deviceResource.orderBy = 'deviceIdentifier asc';
  }

  ngOnInit(): void {
    this.loaderShowOrHide();
    this.dataSource = new DeviceListDataSource(this.deviceService);
    this.dataSource.loadData(this.deviceResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.deviceResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'nameEnglish') {
          this.deviceResource.nameEnglish = escape(strArray[1]);
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.deviceResource.nameSecondLanguage = strArray[1];
        } else if (strArray[0] === 'deviceIdentifier') {
          this.deviceResource.deviceIdentifier = escape(strArray[1]);
        } else if (strArray[0] === 'modelNo') {
          this.deviceResource.modelNo = escape(strArray[1]);
        }

        this.dataSource.loadData(this.deviceResource);
        this.getResourceParameter();
      });
  }
  loaderShowOrHide() {
    this.loader.isLoading$.subscribe(
      (isLoading) => (this.isLoading$ = isLoading)
    );
  }
  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.deviceResource.pageSize = c.pageSize;
          this.deviceResource.skip = c.skip;
          this.deviceResource.totalCount = c.totalCount;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.deviceResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.deviceResource.pageSize = this.paginator.pageSize;
          this.deviceResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.deviceResource);
        })
      )
      .subscribe();
  }

  manageDevice(device: IDevice, componentType: string): void {
    this.dialog
      .open(ManageDeviceComponent, {
        width: '800px',
        data: { device, componentType },
      })
      .afterClosed()
      .subscribe((res) => {
        if (componentType != 'view' && res) {
          this.dataSource = new DeviceListDataSource(this.deviceService);
          this.dataSource.loadData(this.deviceResource);
        }
      });
  }
  lostDevice(device: IDevice, componentType: string): void {
    this.dialog
      .open(LostDeviceComponent, {
        width: '800px',
        data: { device, componentType },
      })
      .afterClosed()
      .subscribe((res) => {
        if (componentType != 'view' && res) {
          this.dataSource = new DeviceListDataSource(this.deviceService);
          this.dataSource.loadData(this.deviceResource);
        }
      });
  }
}
