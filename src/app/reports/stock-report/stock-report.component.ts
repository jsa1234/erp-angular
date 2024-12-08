import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IDevice } from '@core/domain-classes/device';
import { TranslationService } from '@core/services/translation.service';
import { CustomCurrencyPipe } from '@shared/pipes/custome-currency.pipe';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from 'src/app/branch/branch.service';
import { DeviceService } from 'src/app/device/device.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers:[CustomCurrencyPipe]
})
export class StockReportComponent extends BaseComponent implements OnInit {
  // searchForm:FormGroup
  // // dataSource: InventoryDataSource;
  // displayedColumns: string[] = ['action', 'chemicalName', 'stock', 'averagePurchasePrice', 'averageSalesPrice'];
  // columnsToDisplay: string[] = ["footer"];
  // inventoryResource: InventoryResourceParameter;
  // loading$: Observable<boolean>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // _chemicalNameFilter: string;
  // expandedElement: Inventory = null;

  // public filterObservable$: Subject<string> = new Subject<string>();

  // public get ChemicalNameFilter(): string {
  //   return this._chemicalNameFilter;
  // }

  // public set ChemicalNameFilter(v: string) {
  //   this._chemicalNameFilter = v;
  //   const nameFilter = `chemicalName##${v}`;
  //   this.filterObservable$.next(nameFilter);
  // }
  isLoading$: boolean=false;

  constructor(
    // private inventoryService: InventoryService,
    // private cd: ChangeDetectorRef,
    // private dialog: MatDialog,
    private deviceService:DeviceService,
    public translationService: TranslationService,
    private branchService:BranchService,
    private loader:LoaderService
   // private customCurrencyPipe: CustomCurrencyPipe
    )
    {
    super();
    // this.inventoryResource = new InventoryResourceParameter();
    // this.inventoryResource.pageSize = 50;
    // this.inventoryResource.orderBy = 'chemicalName asc'
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.getDevices()
    this.loaderShowOrHide()
    // this.dataSource = new InventoryDataSource(this.inventoryService);
    // this.dataSource.loadData(this.inventoryResource);
    // this.getResourceParameter();
    // this.sub$.sink = this.filterObservable$
    //   .pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged())
    //   .subscribe((c) => {
    //     this.inventoryResource.skip = 0;
    //     const strArray: Array<string> = c.split('##');
    //     if (strArray[0] === 'chemicalName') {
    //       this.inventoryResource.chemicalName = escape(strArray[1]);
    //     }
    //     this.dataSource.loadData(this.inventoryResource);
    //   });
  }


  getDevices(){
    this.sub$.sink = this.deviceService.GetDevices().subscribe((res:IDevice[])=>{
      this.deviceService.SetDevices(res)
    })
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  // ngAfterViewInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       tap(() => {
  //         this.inventoryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
  //         this.inventoryResource.pageSize = this.paginator.pageSize;
  //         this.inventoryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
  //         this.dataSource.loadData(this.inventoryResource);
  //       })
  //     )
  //     .subscribe();
  // }


  // getResourceParameter() {
  //   this.sub$.sink = this.dataSource.responseHeaderSubject$
  //     .subscribe((c: ResponseHeader) => {
  //       if (c) {
  //         this.inventoryResource.pageSize = c.pageSize;
  //         this.inventoryResource.skip = c.skip;
  //         this.inventoryResource.totalCount = c.totalCount;
  //       }
  //     });
  // }

  // toggleRow(element: Inventory) {
  //   this.expandedElement = this.expandedElement === element ? null : element;
  //   this.cd.detectChanges();
  // }


  // onDownloadReport(){
  //   this.inventoryService.getInventoriesReport(this.inventoryResource)
  //   .subscribe((c: HttpResponse<Inventory[]>)=>{
  //    const inventories= [...c.body];
  //     let heading=[[
  //       this.translationService.getValue('CHEMICAL_NAME'),
  //     this.translationService.getValue('STOCK'),
  //     this.translationService.getValue('AVERAGE_PURCHASE_PRICE'),
  //     this.translationService.getValue('AVERAGE_SALES_PRICE')
  //   ]];

  //     let inventoryReport= [];
  //     inventories.forEach((inventory: Inventory)=>{
  //       inventoryReport.push({
  //           'CHEMICAL_NAME':  inventory.chemicalName,
  //           'STOCK': `${inventory.stock} - ${inventory.unitName}`,
  //           'AVERAGE_PURCHASE_PRICE': this.customCurrencyPipe.transform(inventory.averagePurchasePrice),
  //           'AVERAGE_SALES_PRICE': this.customCurrencyPipe.transform(inventory.averageSalesPrice)
  //         });
  //     });

  //     let workBook= XLSX.utils.book_new();
  //     XLSX.utils.sheet_add_aoa(workBook,heading);
  //     let workSheet= XLSX.utils.sheet_add_json(workBook, inventoryReport, {origin: "A2", skipHeader:true });
  //     XLSX.utils.book_append_sheet(workBook,workSheet,"Stock Report");
  //     XLSX.writeFile(workBook, "Stock Report.xlsx");
  //   });
  // }


}

