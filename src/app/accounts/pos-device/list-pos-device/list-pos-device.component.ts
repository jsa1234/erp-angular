import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { POSDeviceDataSource } from './pos-device.datasource';
import { POSDeviceResourceParameter } from '@core/domain-classes/pos-device-resource-parameter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PosDeviceService } from '../pos-device.service';
import { BaseComponent } from 'src/app/base.component';
import { LoaderService } from '@shared/services/loader.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-list-pos-device',
  templateUrl: './list-pos-device.component.html',
  styleUrls: ['./list-pos-device.component.scss']
})
export class ListPosDeviceComponent extends BaseComponent implements OnInit,AfterViewInit {
  dataSource: POSDeviceDataSource;
  displayedColumns: string[] = [
    'action',
    'deviceCode',
    'name',
    'deviceModel',
    'deviceId',
    'brandName'
  ];

  footerToDisplayed: string[] = ['footer'];
  isLoading$: boolean =false;
  posDeviceResource: POSDeviceResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions:number[] = environment.pageSizeOptions
  constructor(
    private posDeviceService: PosDeviceService,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService

  ) { 
    super()
    this.posDeviceResource = new POSDeviceResourceParameter();
    this.posDeviceResource.pageSize = environment.initialPageSize;
    // this.posDeviceResource.orderBy = 'docNo asc';
  }

  ngOnInit(): void {
    this.loaderShowOrHide();
    this.onLoadData()
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  onLoadData() {
    this.dataSource = new POSDeviceDataSource(this.posDeviceService);
    this.dataSource.loadData(this.posDeviceResource);
    this.getResourceParameter();
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.posDeviceResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.posDeviceResource.pageSize = this.paginator.pageSize;
          this.posDeviceResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.posDeviceResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.posDeviceResource.pageSize = c.pageSize;
          this.posDeviceResource.skip = c.skip;
          this.posDeviceResource.totalCount = c.totalCount;
        }
      }
    );
  }

  deletePOSDevice(posDevice: POSDevice) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.posDeviceService.deletePosDevice(posDevice.posDeviceUUID)
            .subscribe(() => {
              this.toastrService.success(this.translationService.getValue('POS_DEVICE_DELETED_SUCCESSFULLY'));
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.posDeviceResource);
            });
        }
      });
  }
}
