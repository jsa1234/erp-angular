import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../product.service';
import { ProductVarientDataSource } from './product-varient.datasource';


@Component({
  selector: 'app-product-varient-list',
  templateUrl: './product-varient-list.component.html',
  styleUrls: ['./product-varient-list.component.scss']
})
export class ProductVarientListComponent implements OnChanges {
  @Input() productId: string;
  dataSource:ProductVarientDataSource
  loading$: Observable<boolean>;

  displayedColumns: string[] = ['units', 'quantity', 'unit-cost','average-cost', 'selling', 'whole-sale', 'mrp','barcode'];
  footerToDisplayed: string[] = ['footer'];
  constructor( 
    private productVarientService:ProductService,
    public translationService:TranslationService) { }


    ngOnChanges(changes: SimpleChanges): void {
      if (changes['productId']) {
        this.getPurchaseVarient();
      }
    }
    getPurchaseVarient(): void {
      this.dataSource = new ProductVarientDataSource(this.productVarientService);
      this.dataSource.loadData(this.productId);
    }
  

}
