import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductUploadInfo } from '@core/domain-classes/product-upload-info.interface';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-bulk-import',
  templateUrl: './product-bulk-import.component.html',
  styleUrls: ['./product-bulk-import.component.scss']
})
export class ProductBulkImportComponent extends BaseComponent implements OnInit {
  selectedFile: File | null = null;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;
  productList: ProductUploadInfo[] = [];
  isLoading$:Observable<boolean> = of(false);
  constructor(
    public translationService:TranslationService, 
    private productService:ProductService, 
    private toastr:ToastrService,
    private loader:LoaderService,
    private router:Router) {
    super();
  }

  ngOnInit(): void {
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }


  uploadFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Please choose file');
      return;
    }
     this.isLoading$ = of(true)
     this.sub$.sink =  this.productService.uploadFile(this.selectedFile).subscribe(
        (response:ProductUploadInfo[]) => {
          this.productList = response
          this.toastr.success('Upload Complete Successfully');
          this.reset()
               this.isLoading$ = of(false)

        },
        error => {
          this.toastr.error('Upload Failed');
               this.isLoading$ = of(false)

        });
}
  downloadExcel(){
    this.sub$.sink =  this.productService.downloadFile().subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'OloBillzProductBulkUpload.xlsx';
      link.click();
    });
  }

  reset(){
    if (!this.fileInputRef) return;
    this.fileInputRef.nativeElement.value = '';
    this.selectedFile = undefined;
  }


  saveProducts(){
    if(this.isSave()){
      return;
    }
    this.isLoading$ = of(true)

    this.sub$.sink = this.productService.saveBulkProducts(this.productList).subscribe((res:any)=>{
     this.isLoading$ = of(false)
     if(res.failedCount == 0){
      this.toastr.success(`Out of ${res.totalCount} items, ${res.insertedCount} were successfully inserted, and ${res.failedCount} items failed.`);

     }else if(res.insertedCount == 0){
      this.toastr.error(`Out of ${res.totalCount} items, ${res.insertedCount} were successfully inserted, and ${res.failedCount} items failed.`);
     }
     else{

     }
      this.toastr.warning(`Out of ${res.totalCount} items, ${res.insertedCount} were successfully inserted, and ${res.failedCount} items failed.`);
      this.router.navigateByUrl('/product');
    },
    error=>{
     this.isLoading$ = of(false)

      this.toastr.error('Product Import Failed');
    })

  }

  deleteRow(index:number){
    this.productList.splice(index,1)
  }


  isSave(): boolean {
    return !(this.productList && this.productList.length > 0 && this.productList.every(product => !product.isEdit));
  }


}
