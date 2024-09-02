import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IBarcodeProfileConfigurations } from '@core/domain-classes/barcode-profile-configurations.interface';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { Observable, forkJoin, of } from 'rxjs';
import { PurchaseService } from '../purchase.service';
import { ProductService } from 'src/app/product/product.service';
import { map, take } from 'rxjs/operators';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';

@Injectable({
  providedIn: 'root'
})
export class BarcodeResolver implements Resolve<{ barcodeProfiles: IBarcodeProfile[], productVariants: PurchaseInvoiceDetail[], barcodeProfileConfigurations:IBarcodeProfileConfigurations[] }> {
  constructor(private cs: ProductService,private ps: PurchaseService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ barcodeProfiles: IBarcodeProfile[], productVariants: PurchaseInvoiceDetail[], barcodeProfileConfigurations:IBarcodeProfileConfigurations[] }> | null {
    const id = route.paramMap.get('id');
    if (!id) return null;

    return forkJoin([
      this.cs.getAllBarcodeProfiles(),
      this.ps.getPurchaseInvoicetems(id),
      this.cs.getBarcodeProfileConfigurations()
    ]).pipe(
      take(1),
      map(([barcodeProfiles,productVariants,barcodeProfileConfigurations])=>{
        return{
          barcodeProfiles,
          productVariants,
          barcodeProfileConfigurations
        }
      })
    )
  }
}
