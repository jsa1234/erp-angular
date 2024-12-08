import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpeningStock } from '@core/domain-classes/opening-stock';
import { OpeningStockResourceParameter } from '@core/domain-classes/opening-stock-resourceparameter';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
import { ProductCategory } from '@core/domain-classes/product-category';
import { CategoryService } from 'src/app/category/category.service';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-opening-stock',
  templateUrl: './opening-stock.component.html',
  styleUrls: ['./opening-stock.component.scss'],
})
export class OpeningStockComponent extends BaseComponent implements OnInit {
  openingStocks: OpeningStock[] = [];
  searchForm:FormGroup
  isLoading$:boolean
  openingStockResource:OpeningStockResourceParameter
  categoryUUID:string = ''
  category: ProductCategory[] = [];
  constructor(
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private loader:LoaderService,
    private fb:FormBuilder,
    private categoryService: CategoryService,
    private branchService:BranchService
  ) {
    super();
    this.openingStockResource = new OpeningStockResourceParameter();
  }


  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.categoryService.getActiveCategories().subscribe((categories)=>{
      this.category = categories;
    })
    this.loaderShowOrHide()
    this.createSearchForm()
   
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  getOpeningStocks() {
    if(this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
    const {branch,category} = this.searchForm.getRawValue()
    this.openingStockResource.branch = branch;
    this.openingStockResource.category= category;
    this.openingStocks = []

    this.sub$.sink = this.inventoryService.getOpeningStocks(this.openingStockResource).subscribe((res: OpeningStock[]) => {
      debugger
      for(let i = 0; i <res.length;i++){
        let ops = new OpeningStock(res[i])
        this.openingStocks.push(ops)
        this.loader.hide()
      }
      if(!res.length){
        this.loader.hide();
        this.toastrService.error('No Data Found');
      }
    },
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
    })
  }
  updateOpeningStock(){
    this.loader.show()
    let newOpeningStocks=//this.openingStocks .filter(stockItem => stockItem.stock > 0)
      this.openingStocks.map(stockItem => ({
      productUUID: stockItem.productUUID,
      stock: stockItem.stock
    }));
   
  
    console.log('openstock',newOpeningStocks);
    //return
    this.sub$.sink  = this.inventoryService.updateOpeningStocks(newOpeningStocks, this.openingStockResource.branch).subscribe((res:OpeningStock)=>{
      this.toastrService.success('Opening Stock Updated successfully')
      //this.clear()
      this.loader.hide()
    },
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
      this.loader.hide()
    })
  }
  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:['',Validators.required],
      category:['',Validators.required]
    })
  }
  parentCategoryHandlerFunction(valueEmitted){
    this.categoryUUID = valueEmitted;
  }

  clear(){
    //this.searchForm.reset();
    this.openingStocks = []
    this.openingStockResource = new OpeningStockResourceParameter()
  }
}
