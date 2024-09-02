import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProduct } from '@core/domain-classes/product';
import { BaseComponent } from 'src/app/base.component';
import { ProductService } from 'src/app/product/product.service';
import {ReportResourceParameter} from '@core/domain-classes/report-classes/purchase-report-resource-parameter'

@Component({
  selector: 'app-product-dropdown',
  templateUrl: './product-dropdown.component.html',
  styleUrls: ['./product-dropdown.component.scss']
})
export class ProductDropdownComponent extends BaseComponent implements OnInit {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  products:IProduct[] = [];
  productList:IProduct[] = [];
  @Input() category:string 
  @Input() subcategory:string 
  @Input() brand:string 
  @Input() isMandatory:boolean = false
  searchControl: FormControl = new FormControl('');
  controlNameLabel: string;

  constructor(private productService:ProductService)
   { 
    super()
   }

  ngOnInit(): void {
    this.getProducts();
    this.controlNameLabel = this.controlName.toString()

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.products = this.filterProduct(searchTerm);
    });
  }

  getProducts(){
    let params:ReportResourceParameter = {
      brand:this.brand?this.brand:'',
      category:this.category?this.category:'',
      subcategory:this.subcategory?this.subcategory:''
    }
    this.sub$.sink = this.productService.getProductsForDropdown(params).subscribe((res: IProduct[]) => {
      this.productList = res;
      this.products = this.filterProduct('');

    }); 
  }

  filterProduct(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.productList;
    } else {
      // Filter by brand name containing the search term
      return this.productList.filter((product) =>
      product.nameEnglish.toLowerCase().includes(searchTerm) ||
      product.productCode.toLowerCase().includes(searchTerm)
      );
    }
  }
}
