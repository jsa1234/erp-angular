import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { IProduct, ProductPrice } from '@core/domain-classes/product';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { ProductResourceParameter } from '@core/domain-classes/product-resource-parameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { ProductService } from 'src/app/product/product.service';
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent extends BaseComponent implements OnInit,AfterViewInit {


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'escape') {
      this.onCancel(false)
    }
  }
  
  productResource:ProductResourceParameter
  pageSizeOptions:number[] = environment.pageSizeOptions
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean;
  searchText:string=''
  constructor(
    public dialogRef:MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public translate:TranslationService,
    private productService:ProductService
  ) { 
    super()
    this.productResource = new ProductResourceParameter();
    this.productResource.pageSize = environment.initialPageSize;
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  onCancel(isLoad:boolean): void {
    this.dialogRef.close(isLoad);
  }
products: IProduct[] = []

selectedVariants: number[] = []; // Initialize an array for selected variants

addSelectedVariants() {
  const selectedVariantsData:ProductBarcode[] = [];

  for (let i = 0; i < this.selectedVariants.length; i++) {
    const product:IProduct = this.products[i];
    const selectedVariantIndex = this.selectedVariants[i];

    if (selectedVariantIndex !== undefined && product.productPrices[selectedVariantIndex]) {
      const selectedVariant:ProductPrice = product.productPrices[selectedVariantIndex];
      selectedVariantsData.push({
       product:product,
       barcode:          selectedVariant.barcode,
       productUUID:      product.productUUID,
       productPriceUUID: selectedVariant.productPriceUUID,
       unitUUID:         selectedVariant.unit.unitUUID,
       quantity:         1,
       unitPrice:        selectedVariant.unitCost,
       amount:           1*selectedVariant.unitCost,
       discountRate:     0,
       discountAmount:   0,
       cgstRate:         product.cgstRate,
       sgstRate:         product.sgstRate,
       igstRate:         product.igstRate,
       cessRate:         product.cessRate,
       addnlCessRate:    product.addnlCessRate,
       itemTotalAmount:  0,
       unit:             selectedVariant.unit,
       tax:              product.tax,
       cess:             product.cess,
       addnlCess:        product.addnlCess,
       taxObj:           product.taxObj,
       cessObj:          product.cessObj,
       addnlCessObj:     product.addnlCessObj
      });
    }
  }
  this.dialogRef.close(selectedVariantsData);
}

updateSelectedVariant(productIndex: number, variantIndex: number) {
  this.selectedVariants = new Array(this.products.length).fill(null);
  this.selectedVariants[productIndex] = variantIndex;
}

getAllProducts():void{
  this.isMulti = this.data.isMulti
  this.products = []

  this.isLoading = true
  this.productService.SearchProduct(this.productResource).subscribe((resp: HttpResponse<IProduct[]>)=>{
    if(resp&&resp.headers){
      const paginationParam = JSON.parse(
        resp.headers.get('X-Pagination')
      ) as ResponseHeader;
      this.productResource.pageSize = paginationParam?.pageSize
      this.productResource.skip = paginationParam?.skip
      this.productResource.totalCount = paginationParam?.totalCount
      if(this.data.selectedVariantsUUID.length<=0){
        this.products = resp.body;
      this.isLoading = false
        return;
      }
    const filteredProducts = resp.body.map(product => {
      const filteredVariants = product.productPrices.filter(variant => {
        return !this.data.selectedVariantsUUID.includes(variant.productPriceUUID);
      });
    
      if (filteredVariants.length > 0) {
        return { ...product, productPrices: filteredVariants };
      }
      return null;
    }).filter(product => product !== null); 
    this.products = [...filteredProducts];
      this.isLoading = false
    }
  })
}

ngAfterViewInit() {
  this.products = []
  if (this.paginator) {
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.productResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.productResource.pageSize = this.paginator.pageSize;
          this.getAllProducts();
        })
      )
      .subscribe();
  } else {
    // Handle the case where this.paginator is undefined
    console.error('Paginator is not defined.');
  }
}

onSearch(): void {
  // this.productResource = new ProductResourceParameter();
  // this.productResource.searchQuery = this.searchText;
  // this.getAllProducts();
  const trimmedSearchText = this.searchText.trim();
  
  if (trimmedSearchText) {
    this.productResource = new ProductResourceParameter(); // Reset the resource parameter
    this.productResource.searchQuery = trimmedSearchText; // Set the search query
    this.productResource.pageSize = environment.initialPageSize; // Set initial page size (if required)
    this.getAllProducts(); // Call the API
  } else {
    // Optionally, handle empty searches by either clearing the products list or showing a message
    this.products = [];
    console.warn('Search text is empty. No API call made.');
  }
}
isMulti:boolean = true

onKeyUp(event: KeyboardEvent): void {
  // Optional: Handle other key events if needed
  console.log('Key pressed:', (event.target as HTMLInputElement).value);
}
}
