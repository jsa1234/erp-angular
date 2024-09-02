import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { Observable, forkJoin, of } from 'rxjs';
import { ProductService } from '../product.service';
import { map, take } from 'rxjs/operators';
import { IBarcodeProfileConfigurations } from '@core/domain-classes/barcode-profile-configurations.interface';
import { IProduct } from '@core/domain-classes/product';

@Injectable({
  providedIn: 'root',
})
export class BarcodeResolver implements Resolve<{ barcodeProfiles: IBarcodeProfile[], product: IProduct, barcodeProfileConfigurations:IBarcodeProfileConfigurations[] }> {
  constructor(private cs: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ barcodeProfiles: IBarcodeProfile[], product: IProduct, barcodeProfileConfigurations:IBarcodeProfileConfigurations[] }> | null {
    const id = route.paramMap.get('id');
    if (!id) return null;

    return forkJoin([
      this.cs.getAllBarcodeProfiles(),
      this.cs.getSingleProduct(id),
      this.cs.getBarcodeProfileConfigurations()
    ]).pipe(
      take(1),
      map(([barcodeProfiles,product,barcodeProfileConfigurations])=>{
        return{
          barcodeProfiles,
          product,
          barcodeProfileConfigurations
        }
      })
    )
  }
}
