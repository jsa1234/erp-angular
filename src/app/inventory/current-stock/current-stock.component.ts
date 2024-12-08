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
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.scss'],
})
export class CurrentStockComponent extends BaseComponent implements OnInit {
  openingStocks: OpeningStock[] = [];
  searchForm: FormGroup;
  isLoading$: boolean;
  openingStockResource: OpeningStockResourceParameter;
  categoryUUID: string = '';
  category: ProductCategory[] = [];
  products: any[] = [];
  constructor(
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private loader: LoaderService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private branchService: BranchService
  ) {
    super();
    this.openingStockResource = new OpeningStockResourceParameter();
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.categoryService.getActiveCategories().subscribe((categories) => {
      this.category = categories;
    });
    this.loaderShowOrHide();
    this.createSearchForm();
  }

  loaderShowOrHide() {
    this.loader.isLoading$.subscribe((isLoading) => (this.isLoading$ = isLoading));
  }

  getOpeningStocks() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show();
    debugger
    const { branch, category, product } = this.searchForm.getRawValue();
    this.openingStockResource.branch = branch;
    this.openingStockResource.category = category;
    this.openingStockResource.product = product?product:"";
    this.openingStocks = [];

    this.sub$.sink = this.inventoryService.getOpeningStocks(this.openingStockResource).subscribe(
      (res: OpeningStock[]) => {
        
        if (res.length === 0) {
          this.loader.hide(); // Hide loader if no data
          this.toastrService.error('No Data Found');
          return; // Exit the function
        }
        for (let i = 0; i < res.length; i++) {
          let ops = new OpeningStock(res[i]);
          this.openingStocks.push(ops);
          this.loader.hide();
        }
      },
      () => {
        this.loader.hide();
        this.toastrService.error('Something Went Wrong, Try Again Later');
      }
    );
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      branch: ['', Validators.required],
      category: ['', Validators.required],
      product: [''],
    });
  }

  parentCategoryHandlerFunction(valueEmitted: string) {
    this.categoryUUID = valueEmitted;  // Set the selected category UUID
  }

  clear() {
    this.openingStocks = [];
    this.openingStockResource = new OpeningStockResourceParameter();
  }
}
