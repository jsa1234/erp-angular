import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from '@core/domain-classes/brand';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { ProductCategory } from '@core/domain-classes/product-category';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';

@Component({
  selector: 'app-barcode-product-modal',
  templateUrl: './barcode-product-modal.component.html',
  styleUrls: ['./barcode-product-modal.component.scss']
})
export class BarcodeProductModalComponent implements OnInit {
  productList: ProductBarcode[];
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'escape') {
      this.onCancel()
    }
  }
  selectedProductIndex:number
  constructor(
    public dialogRef:MatDialogRef<BarcodeProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data:ProductBarcode[],
  ) { }

  ngOnInit(): void {
    this.productList = this.data.map(product => {
      const parsedCategory:ProductCategory = JSON.parse(product.productObject.category);
      const parsedSubcategory:ProductSubcategory = JSON.parse(product.productObject.subCategory);
      const parsedBrand:Brand = JSON.parse(product.productObject.brand);
      const mrp:number = product.productObject.productPrices[0].mrp
      return {
        category: parsedCategory.nameEnglish ?? '',
        subcategory: parsedSubcategory.nameEnglish ?? '',
        brand: parsedBrand.nameEnglish ?? '',
        mrp:mrp,
        ...product,
        // Include other properties from productObject or any additional properties you want
      };
    });
    
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }
  
  addProduct(){
        const selectedProduct = this.productList[this.selectedProductIndex];
        this.dialogRef.close(selectedProduct)
  }
}
