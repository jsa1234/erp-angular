import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct, Product, ProductPrice } from '@core/domain-classes/product';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  product: Product;
  imagePath$: Observable<string> ;
  producPrices:ProductPrice[] = [];


  constructor(private route:ActivatedRoute) {
    super();
    
  }
  ngOnInit(): void {
    this.getProductDetail()
   
  }
  getProductDetail():void{
    this.sub$.sink = this.route.data.subscribe(
      (data: { product: IProduct }) => {
        if (!data.product) 
          return;

          this.product = new Product(data.product);
          this.producPrices = [...this.product.productPrices]
          this.imagePath$ = this.product.imagePath? of(`${environment.apiUrl}${this.product.imagePath}`) : of(environment.dummyImage)
      });
  }
    
}
