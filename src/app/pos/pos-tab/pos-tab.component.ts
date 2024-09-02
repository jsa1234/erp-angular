import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '@core/domain-classes/product';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { BarcodeProductModalComponent } from '@shared/components/barcode-product-modal/barcode-product-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/product/product.service';
import { FormattedData } from 'src/app/purchase/purchase-manage/formated-data.interface';

@Component({
  selector: 'app-pos-tab',
  templateUrl: './pos-tab.component.html',
  styleUrls: ['./pos-tab.component.scss']
})
export class PosTabComponent implements OnInit {

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onBarcodeScanned(this.barcodeValue);
    } else if (event.key.toLowerCase() === 'f2') {
      this.showBarcodeInput();
    }
  }
  @ViewChildren('quantityInput') quantityInputs: QueryList<ElementRef>;
  @Output() createTab: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('barcodeInput') barcodeInput: ElementRef;

  selectedVariants: any[]=[];
  otherExpense:number = 0;
  transportationExpense:number = 0;
  roundoff:number = 0;
  total:number = 0;
  subtotal: number = 0;
  totalDiscount: number = 0;
  totalTaxable: number = 0;
  totalVAT: number = 0;
  invalidValue: boolean;
  totalQuantity: number = 0;
  barcodeValue: string;
  roundedTotal: number=0;
  constructor(private productService:ProductService, private renderer:Renderer2,    private dialog: MatDialog,
    private toastr: ToastrService,
) { }

  ngOnInit(): void {
  }
  onCreateTab() {
    this.createTab.emit(); // Emit an event without data to trigger the parent function.
  }

  showBarcodeInput() {
    setTimeout(() => {
      this.focusBarcodeInput();
    });
  }
  focusBarcodeInput() {
    if (this.barcodeInput) {
      this.renderer.selectRootElement(this.barcodeInput.nativeElement).focus();
    }
  }



  onBarcodeScanned(barcodeData: string) {
    if (!barcodeData) {
      return;
    }
 this.productService
      .getProductWithBarcode(barcodeData)
      .subscribe((data:ProductBarcode[]) => {

        this.barcodeValue = ''

        this.barcodeValue = '';
        if (data && data.length > 0) {
          if (data.length === 1) {
            const formattedData = new FormattedData(data[0]).formatDataBarcode()
            this.selectedVariants.push(formattedData)
          } else {
            // Multiple items, open modal
            const dialogRef = this.dialog.open(BarcodeProductModalComponent, {
              width: '100%',
              disableClose: true,
              data: data,
            });
        
            dialogRef.afterClosed().subscribe((res:ProductBarcode) => {
              const formattedData = new FormattedData(res).formatDataBarcode()
              this.selectedVariants.push(formattedData)
            });
          }
        } else {
          this.toastr.warning('No product found for the given barcode.')
        }


      });
      this.calculateTotals();
    // Call your API to fetch product variant data based on the barcode.

    // Assuming you've fetched the data and stored it in productVariants array.
    // You can set focus on the quantity input box in the last row.
    setTimeout(() => {
      if (this.selectedVariants.length > 0) {
        const lastInput = this.quantityInputs.last.nativeElement;
        this.renderer.selectRootElement(lastInput).focus();
      }
    },2000);
  }


  updateAmount(item: any) {
    item.amount = item.quantity * item.unitPrice;
    item.discountRate = (item.discountAmount / item.amount) * 100;
    item.vatAmount = item.amount - item.discountAmount;
    item.vat = (item.vatRate / 100) * item.vatAmount;
    item.itemTotalAmount = item.vatAmount + item.vat;
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalQuantity = this.selectedVariants?.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.subtotal = this.selectedVariants?.reduce(
      (total, item) => total + item.amount,
      0
    );
    this.totalDiscount = this.selectedVariants?.reduce(
      (total, item) => total + item.discountAmount,
      0
    );
    this.totalTaxable = this.selectedVariants?.reduce(
      (total, item) => total + item.vatAmount,
      0
    );
    this.totalVAT = this.selectedVariants?.reduce(
      (total, item) => total + item.vat,
      0
    );
    this.roundedTotal = this.totalTaxable + this.totalVAT + this.otherExpense + this.transportationExpense - this.roundoff;
    this.total = this.totalTaxable + this.totalVAT + this.otherExpense + this.transportationExpense
  }
  validateRoundoff() {
    if (this.roundoff < 0 || this.roundoff > 1) {
      this.invalidValue = true;
      // this.roundoff = 0; // Reset the value to null or any default value
    } else {
      this.invalidValue = false;
      this.calculateTotals();
    }
  }

  save(){
    console.log(this.selectedVariants)
  }

  products = [

    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    },
    {
      imageUrl:'../../../assets/images/product.png',
      productName:'haii',
      productCode:'hello',
      mrp:400
    }
    
  ]

  onScroll(e){
    console.log(e)
    let a = [
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      },
      {
        imageUrl:'../../../assets/images/product.png',
        productName:'haii',
        productCode:'hello',
        mrp:400
      }
    ]


    this.products = [...this.products,...a]
  }


  selectProduct(product:IProduct){
    console.log(product)
  }

  
}