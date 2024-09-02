import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { IStockTransferItem } from '@core/domain-classes/stock-transfer-items.interface';
import { User } from '@core/domain-classes/user';
import { TranslationService } from '@core/services/translation.service';
import { ProductModalComponent } from '@shared/components/product-modal/product-modal.component';
import { MapperService } from '@shared/services/mapper.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { UserService } from 'src/app/user/user.service';
import { v4 as uuid } from 'uuid';
import { InventoryService } from '../../inventory.service';
import { ProductService } from 'src/app/product/product.service';
import { BarcodeProductModalComponent } from '@shared/components/barcode-product-modal/barcode-product-modal.component';

@Component({
  selector: 'app-manage-stock-transfer',
  templateUrl: './manage-stock-transfer.component.html',
  styleUrls: ['./manage-stock-transfer.component.scss'],
})
export class ManageStockTransferComponent
  extends BaseComponent
  implements OnInit
{
  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onBarcodeScanned(this.barcodeValue);
    } else if (event.key.toLowerCase() === 'f2') {
      this.showBarcodeInput();
    } else if (event.altKey && event.key.toLowerCase() === 's') {
      if (!this.dialogRef || !this.dialogRef.componentInstance) {
        this.openProductDialog();
      }
    }
  }
  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  @ViewChildren('quantityInput') quantityInputs: QueryList<ElementRef>;
  dialogRef: MatDialogRef<any>;
  barcodeValue: string = '';
  stockTransferForm: FormGroup;
  selectedVariants: IStockTransferItem[] = [];
  selectedVariantsUUID: string[] = [];
  users: User[] = [];
  subTotal: number = 0;
  isUpdate: boolean;


  constructor(
    public translate: TranslationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private userService: UserService,
    private stockTransferservice:InventoryService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    private documentService:DocumentService,
    private mapperService:MapperService,
    private productService:ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getStockTransferDetail()
    this.getUser();
  }
  createForm(): void {
    this.stockTransferForm = this.fb.group({
      stockTransferUUID: [uuid()], 
      docNo: [{value:'',disabled:true}], 
      docDate: ['',Validators.required],
      refInvNo: [''],
      refInvDate: [''],
      sourceBranchUUID: ['',Validators.required],
      destinationBranchUUID: ['',Validators.required],
      remarks: [''],
      userUUID: [''],
    });
  }
get stockTransferUUID(){
  return this.stockTransferForm.get('stockTransferUUID').value
}
  showBarcodeInput() {
    setTimeout(() => {
      this.focusBarcodeInput();
    });
  }

  openProductDialog() {
    console.log(this.selectedVariantsUUID)
    const modalData = {
      selectedVariantsUUID: this.selectedVariantsUUID,
      isMulti: true,
    };
    if (!this.dialogRef || !this.dialogRef.componentInstance) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; 
      dialogConfig.width = '70%';
      dialogConfig.data = modalData
      this.dialogRef = this.dialog.open(ProductModalComponent, dialogConfig);
      this.dialogRef
        .afterClosed()
        .subscribe((res: ProductBarcode[]) => {
          if (!res) return;
          this.selectedVariants.push(...this.mapperService.mapArrayToStockTransferItems(res,this.stockTransferUUID));
          this.selectedVariantsUUID = this.selectedVariants.map(
            (res) => res.productPriceUUID
          );
          this.calculateTotal();
          this.dialogRef = null;
        });
    }
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
    this.sub$.sink = this.productService
      .getProductWithBarcode(barcodeData)
      .subscribe((data: ProductBarcode[]) => {
        this.barcodeValue = '';
        if (data && data.length > 0) {
          if (data.length === 1) {
            this.selectedVariants.push(this.mapperService.mapToStockTransferItem(data[0],this.stockTransferUUID,true));
            this.selectedVariantsUUID.push( data[0].productPriceUUID)
            this.calculateTotal()
            this.focusQuantity();
          } else {
            // Multiple items, open modal
            const dialogRef = this.dialog.open(BarcodeProductModalComponent, {
              width: '100%',
              disableClose: true,
              data: data,
            });
        
            dialogRef.afterClosed().subscribe((res:ProductBarcode) => {
              this.selectedVariants.push(this.mapperService.mapToStockTransferItem(res,this.stockTransferUUID,true));
              this.selectedVariantsUUID.push( res.productPriceUUID)
              this.calculateTotal()
              this.focusQuantity();
            });
          }
        } else {
          this.toastr.warning('No product found for the given barcode.')
        }




      });
  }

  focusQuantity(): void {
    setTimeout(() => {
      if (this.selectedVariants.length > 0) {
        const lastInput = this.quantityInputs.last.nativeElement;
        this.renderer.selectRootElement(lastInput).focus();
      }
    }, 1000);
  }

  updateAmount(item: IStockTransferItem) {
    item.netTotalAmount = item.quantity * item.unitPrice;
   this.calculateTotal()
  }

  calculateTotal(){
    this.subTotal = this.selectedVariants?.reduce(
      (total, item) => total + item.netTotalAmount,
      0
    );
  }
  getUser(): void {
    this.sub$.sink = this.userService
      .getUserProfile()
      .subscribe((user: User) => {
        this.users?.push(user);
        this.users
          ? this.stockTransferForm.patchValue({
              userUUID: this.users[0].id,
            })
          : '';
      });
    this.stockTransferForm.get('userUUID').disable();
  }


  save():void{
    if(this.stockTransferForm.invalid){
      this.stockTransferForm.markAllAsTouched();
      this.toastr.warning('Mandatory Filed required')
      return;
    }
    if(this.selectedVariants.length<=0){
      this.toastr.warning('select atleast one item to transfer')
      return;
    }
     const data = this.mapperService.mapStockTransferSave(this.stockTransferForm.getRawValue(),this.selectedVariants,this.subTotal) 
    this.isUpdate?this.updateStockTransfer(data):this.addStockTransfer(data)
  

  }

  addStockTransfer(stockTransferData:any){
    this.stockTransferservice.addStockTransfer(stockTransferData).subscribe(()=>{
      this.toastr.success('Stock Transfer Added Successfully')
    this.router.navigate(['/inventory/stock-transfer'], { relativeTo: this.route });

    })
  }
  updateStockTransfer(stockTransferData:any){
    this.stockTransferservice.updateStockTransfer(stockTransferData).subscribe(()=>{
      this.toastr.success('Stock Transfer Updated Successfully')
      this.router.navigate(['/inventory/stock-transfer'], { relativeTo: this.route });

    })
  }

  getStockTransferDetail():void{
    this.sub$.sink = this.route.data.subscribe(
      (data: { stockTransfer: IStockTransfer }) => {
        if (!data.stockTransfer) {
          this.createForm();
          this.selectedVariants = [];
          this.selectedVariantsUUID = [];
        this.isUpdate =false
        this.getDocumentNumber()
          return;
        }
       
        this.isUpdate =true
        this.stockTransferForm.patchValue(data.stockTransfer);
        this.selectedVariants =data.stockTransfer.stockTransferDetails
        this.selectedVariantsUUID = this.selectedVariants.map((res:IStockTransferItem) => res.productPriceUUID);
        this.calculateTotal();
      }
    );
  }
  
  
  getDocumentNumber(){
    this.sub$.sink = this.documentService.getNextDocumentNo(DocumentTypeEnum.STOCKTRANSFER).subscribe((res:IDocument)=>{
      this.stockTransferForm.patchValue({docNo:res.consolidatedDocumentNo})
    })
  }


  deleteRow(uuid:string){
    this.selectedVariants = this.selectedVariants.filter(x=>x.productPriceUUID != uuid)
    this.selectedVariantsUUID = this.selectedVariantsUUID.filter(x=>x != uuid)
  }


}
