import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseService } from '../../purchase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-price-update-dialog',
  templateUrl: './price-update-dialog.component.html',
  styleUrls: ['./price-update-dialog.component.scss']
})
export class PriceUpdateDialogComponent extends BaseComponent implements OnInit {
  isLoading$:Observable<boolean> = of(false)
  purchaseInvoice: PurchaseInvoiceDetail[] = [];
  constructor(private purchaseInvoiceService:PurchaseService,
    public dialogRef: MatDialogRef<PriceUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:PurchaseInvoiceDetail[],
    private toastr:ToastrService) {
    super();
  }
  ngOnInit(): void {
    this.purchaseInvoice = this.data
    this.purchaseInvoice.forEach(x => {
      x.unitCost = x. unitPrice
      x.productObject = JSON.parse(x.product);
      x.unitObject = JSON.parse(x.unit);
    });
    
    console.log(this.purchaseInvoice)
  }
  
  updatePrice():void{
    this.sub$.sink = this.purchaseInvoiceService.UpdatePrices(this.purchaseInvoice).subscribe((res)=>{
      this.toastr.success('Prices Updated Succesfully')
      this.onCancel()
    },
    ()=>{
      this.toastr.success('Prices Updated Failed')
    })
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
