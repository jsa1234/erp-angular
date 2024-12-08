import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProduct } from '@core/domain-classes/product';
import { BaseComponent } from 'src/app/base.component';
import { ProductService } from 'src/app/product/product.service';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-dropdown',
  templateUrl: './product-dropdown.component.html',
  styleUrls: ['./product-dropdown.component.scss'],
})
export class ProductDropdownComponent extends BaseComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() controlName: FormControl;
  @Input() category: string;  // Accept category from parent
  @Input() subcategory: string;  // Accept subcategory from parent
  @Input() brand: string;  // Accept brand from parent
  @Input() isMandatory: boolean = false;

  products: IProduct[] = [];
  productList: IProduct[] = [];
  searchControl: FormControl = new FormControl('');
  controlNameLabel: string;
  showAllOption: boolean = false;
  constructor(private productService: ProductService,private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.controlNameLabel = this.controlName.toString();
    this.showAllOption = this.router.url.endsWith('current-stock');
    // Fetch products on component initialization
    this.getProducts();

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.products = this.filterProduct(searchTerm);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // When any of the inputs change (category, subcategory, or brand), fetch products again
    if (changes['category'] || changes['subcategory'] || changes['brand']) {
      this.getProducts();
    }
  }

  getProducts(): void {
    // Prepare params dynamically based on available inputs
    let params: ReportResourceParameter = {
      category: this.category ? this.category : '', // Use categoryUUID if available
      subcategory: this.subcategory ? this.subcategory : '', // Use subcategoryUUID if available
      brand: this.brand ? this.brand : '', // Use brandUUID if available
    };

    // Call the product service to get the filtered products based on passed params
    this.sub$.sink = this.productService.getProductsForDropdown(params).subscribe((res: IProduct[]) => {
      this.productList = res;
      this.products = this.filterProduct('');
    });
  }

  filterProduct(searchTerm: string): IProduct[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      return this.productList;
    } else {
      return this.productList.filter(
        (product) =>
          product.nameEnglish.toLowerCase().includes(searchTerm) ||
          product.productCode.toLowerCase().includes(searchTerm)
      );
    }
  }
}
