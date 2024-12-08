import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { POSPrinterResourceParameter } from '@core/domain-classes/pos-printer-resource-parameter';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { PosPrinterService } from '../pos-printer.service';
import { POSPrinterDataSource } from './pos-printer-list.datasource';

@Component({
  selector: 'app-pos-printer-list',
  templateUrl: './pos-printer-list.component.html',
  styleUrls: ['./pos-printer-list.component.scss']
})
export class PosPrinterListComponent extends BaseComponent implements OnInit,AfterViewInit {

  dataSource: POSPrinterDataSource;
  displayedColumns: string[] = [
    'name',
    'modelName',
    'serialNo',
    'ipAddress',
    'action',
  ];

  footerToDisplayed: string[] = ['footer'];
  isLoading$: boolean =false;
  posPrinterResource: POSPrinterResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions:number[] = environment.pageSizeOptions
  constructor(
    private posPrinterService: PosPrinterService,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService

  ) { 
    super()
    this.posPrinterResource = new POSPrinterResourceParameter();
    this.posPrinterResource.pageSize = environment.initialPageSize;
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
    this.dataSource = new POSPrinterDataSource(this.posPrinterService);
    this.dataSource.loadData(this.posPrinterResource);
    this.getResourceParameter();
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.posPrinterResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.posPrinterResource.pageSize = this.paginator.pageSize;
          this.posPrinterResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.posPrinterResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.posPrinterResource.pageSize = c.pageSize;
          this.posPrinterResource.skip = c.skip;
          this.posPrinterResource.totalCount = c.totalCount;
        }
      }
    );
  }

  deletePOSPrinter(posPrinter: POSPrinter) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.posPrinterService.deletePosPrinter(posPrinter.posPrinterUUID)
            .subscribe(() => {
              this.toastrService.success(this.translationService.getValue('POS_PRINTER_DELETED_SUCCESSFULLY'));
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.posPrinterResource);
            });
        }
      });
  }

}
