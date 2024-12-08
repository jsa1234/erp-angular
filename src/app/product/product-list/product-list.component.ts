import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { BaseComponent } from 'src/app/base.component';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { ProductDataSource } from './product-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ProductResourceParameter } from '@core/domain-classes/product-resource-parameter';
import { Product } from '@core/domain-classes/product';
import { environment } from '@environments/environment';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProductListComponent extends BaseComponent implements OnInit {
  dataSource: ProductDataSource;
  products: Product[] = [];
  displayedColumns: string[] = [
    'productCode',
    'nameEnglish',
    // 'nameSecondLanguage',
    'category',
    'sub-category',
    'brand',
    'action',
    // 'partNo',
  ];
  searchHeaders: string[] = [
    'code-search',
  //  'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'category-search',
    'sub-search',
    'brand-search',
    'action-search',
    // 'part-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  isLoadingResults = true;
  productResource: ProductResourceParameter;
  loading$: Observable<boolean>;
  pageSizeOptions: number[] = environment.pageSizeOptions;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  toggleData: boolean = false;
  expandedElement: Product | null;
  filterForm: FormGroup;


  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private router: Router,
    public translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private fb:FormBuilder,
    private branchService: BranchService
  ) {
    super();
    this.productResource = new ProductResourceParameter();
    this.productResource.pageSize = environment.initialPageSize;
    this.productResource.orderBy = 'nameEnglish asc';
  }

  ngOnInit(): void {
     this.branchService.isHeadOfficeSubject$.next(true);
      this.createFilterForm()
      this.onLoadData()
  }


  onLoadData(){

    this.dataSource = new ProductDataSource(this.productService);
    this.dataSource.loadData(this.productResource);
    this.getResourceParameter();


    // this.sub$.sink = this.filterObservable$
    //   .pipe(debounceTime(1000), distinctUntilChanged())
    //   .subscribe((c) => {
    //     this.productResource.skip = 0;
    //     const strArray: Array<string> = c.split(':');
    //     if (strArray[0] === 'nameEnglish') {
    //       this.productResource.nameEnglish = strArray[1];
    //     } else if (strArray[0] === 'nameSecondLanguage') {
    //       this.productResource.nameSecondLanguage = strArray[1];
    //     } else if (strArray[0] === 'category') {
    //       this.productResource.category = strArray[1];
    //     } else if (strArray[0] === 'subcategory') {
    //       this.productResource.subCategory = strArray[1];
    //     } else if (strArray[0] === 'brand') {
    //       this.productResource.brand = strArray[1];
    //     } else if (strArray[0] === 'partno') {
    //       this.productResource.partNo = strArray[1];
    //     } else if (strArray[0] === 'productCode') {
    //       this.productResource.productCode = strArray[1];
    //     }

    //     this.dataSource.loadData(this.productResource);
    //   });


      this.sub$.sink = this.filterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        const formValues = this.filterForm.getRawValue()
        this.productResource.skip = 0;
        this.productResource.nameEnglish = formValues.nameEnglish;
        this.productResource.category = formValues.category;
        this.productResource.subCategory = formValues.subCategory;
        this.productResource.brand = formValues.brand;
        // this.productResource.partNo = formValues.partNo;
        this.productResource.productCode = formValues.productCode;
        this.dataSource.loadData(this.productResource);
      });
  }

  createFilterForm():void{
    this.filterForm = this.fb.group({
      nameEnglish:[''],
    //  nameSecondLanguage:[''],
     category:[''],
     subCategory:[''],
     brand:[''],
    //  partNo:[''],
     productCode:[''],
    })
  }



  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.productResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.productResource.pageSize = this.paginator.pageSize;
          this.productResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.productResource);
        })
      )
      .subscribe();
  }

  deleteProduct(product: Product) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${product.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.productService
            .deleteProduct(product.productUUID)
            .subscribe(() => {
              this.toastrService.success(
                this.translationService.getValue('Product Deleted Successfully')
              );
              this.paginator.pageIndex = 0;
              this.productResource.nameEnglish = '';
              this.dataSource.loadData(this.productResource);
            });
        }
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.productResource.pageSize = c.pageSize;
          this.productResource.skip = c.skip;
          this.productResource.totalCount = c.totalCount;
        }
      }
    );
  }

  editProduct(productId: string) {
    this.router.navigate(['/product/manage/', productId]);
  }
  detailProduct(productId: string) {
    this.router.navigate(['/product/detail/', productId]);
  }
  generateBarcode(productId: string) {
    this.router.navigate(['/product/barcode-generate/', productId]);
  }

  toggleRow(product: Product) {
    this.expandedElement = this.expandedElement === product ? null : product;
    this.cd.detectChanges();
  }
  //for enter key search...
  // onFilterApply(): void {
  //   const formValues = this.filterForm.getRawValue();
  //   this.productResource.skip = 0;
  //   this.productResource.nameEnglish = formValues.nameEnglish;
  //   this.productResource.category = formValues.category;
  //   this.productResource.subCategory = formValues.subCategory;
  //   this.productResource.brand = formValues.brand;
  //   this.productResource.productCode = formValues.productCode;
  //   this.dataSource.loadData(this.productResource);
  // }
  
  
}