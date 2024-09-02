import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductResolverService } from './product.resolver';
import { AuthGuard } from '@core/security/auth.guard';
import { ProductBarcodeGenerateComponent } from './product-barcode-generate/product-barcode-generate.component';
import { BarcodeResolver } from './product-barcode-generate/barcode.resolver';
import { ProductBulkImportComponent } from './product-bulk-import/product-bulk-import.component';
import { ManageProductComponent } from './manage-product/manage-product.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        data: { claimType: 'product_product_list_product' },
        canActivate: [AuthGuard]
      },
      {
        path: 'manage/:id',
        component: ManageProductComponent,
        data: { claimType: ['product_product_create_product', 'product_product_edit_product'] },
        canActivate: [AuthGuard],
        resolve: { product: ProductResolverService }
      },
      {
        path: 'barcode-generate/:id',
        component: ProductBarcodeGenerateComponent,
        data: { claimType: 'product_product_generate_barcode' },
        // canActivate: [AuthGuard],
        resolve: { barcode: BarcodeResolver }
      },
      {
        path: 'bulk-import',
        component: ProductBulkImportComponent,
        data: { claimType:'product_product_bulk_import_product' },
        canActivate: [AuthGuard],
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolverService }
        // data: { claimType:'product_product_bulk_import_product' },
        // canActivate: [AuthGuard],
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
