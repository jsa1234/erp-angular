import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDamageEntryDetail } from '@core/domain-classes/damage-entry-details.interface';
import { DamageEntryForm } from '@core/domain-classes/damage-entry-form.interface';
import { DamageEntryProductList } from '@core/domain-classes/damage-entry-product-list,interface';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';
import { ProductModalComponent } from '@shared/components/product-modal/product-modal.component';
import { MapperService } from '@shared/services/mapper.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { ProductService } from 'src/app/product/product.service';
import { v4 as uuid } from 'uuid';
import { DamageEntryService } from '../damage-entry.service';
import { BarcodeProductModalComponent } from '@shared/components/barcode-product-modal/barcode-product-modal.component';

@Component({
  selector: 'app-manage-damage-entry',
  templateUrl: './manage-damage-entry.component.html',
  styleUrls: ['./manage-damage-entry.component.scss'],
})
export class ManageDamageEntryComponent
  extends BaseComponent
  implements OnInit
{
  dialogRef: MatDialogRef<any>; // You should specify the actual type for your dialog
  barcodeValue: string;
  grandTotal: any;
  isUpdate: boolean = false;


  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onBarcodeScanned(this.barcodeValue);
    } else if (event.key.toLowerCase() === 'f2') {
      this.showBarcodeInput();
    } else if (event.altKey && event.key.toLowerCase() === 's') {
      // Check if a dialog is already open
      if (!this.dialogRef || !this.dialogRef.componentInstance) {
        // No dialog is open, so open it
        this.openProductDialog();
      }
    }
  }

  damageEntryForm: FormGroup;
  damageProductList: IDamageEntryDetail[];
  selectedVariantsUUID: string[];
  deviceUUID:string
  constructor(
    public translate: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private damageEntryService: DamageEntryService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private productService: ProductService,
    private documentService:DocumentService,
    private mapperService:MapperService,
    securityService:SecurityService,
  ) {
    super();
    this.deviceUUID =securityService.getUserDetail().deviceUUID
  }

  ngOnInit(): void {
    this.createForm()
    this.getDamageEntry();
  }

  getDamageEntry(): void {
    this.sub$.sink = this.route.data.subscribe(
      (data: { damageEntry: IDamageEntry }) => {
        if (!data.damageEntry) {
          this.createForm();
          this.damageProductList = [];
          this.selectedVariantsUUID = [];
        this.isUpdate =false
        this.getDocumentNumber()

          return;
        }
       
        this.isUpdate =true
        this.damageEntryForm.patchValue(data.damageEntry);
        this.damageProductList = data.damageEntry.damageDetails
        this.selectedVariantsUUID = this.damageProductList.map((res) => res.productPriceUUID);
        this.calculateTotal();
      }
    );
  }

  createForm(): void {
    this.damageEntryForm = this.fb.group({
      damageUUID: [uuid()],
      branchUUID: ['', Validators.required],
      deviceUUID: [this.deviceUUID],
      docNo: [{value:'',disabled:true}],
      docDate: ['', Validators.required],
      remarks: [''],
    });
  }


  get damageEntryUUID(){
    return this.damageEntryForm.get('damageUUID').value
  }

  openProductDialog() {
    const modalData = {
      selectedVariantsUUID: this.selectedVariantsUUID,
      isMulti: true
    };
    if (!this.dialogRef || !this.dialogRef.componentInstance) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true; 
      dialogConfig.width = '70%';
      dialogConfig.data = modalData;
      this.dialogRef = this.dialog.open(ProductModalComponent, dialogConfig);
      this.dialogRef.afterClosed().subscribe((res: ProductBarcode[]) => {
        if (!res) return;
        this.damageProductList.push(...this.mapperService.mapArrayToDamageEntryItems(res,this.damageEntryUUID,false));
        this.selectedVariantsUUID = this.damageProductList.map(
          (res) => res.productPriceUUID
        );
        this.calculateTotal();
        this.dialogRef = null;
      });
    }
  }


  updateAmount(item: DamageEntryProductList) {
    item.totalAmount = item.damageQuantity * item.averageRate;
    this.calculateTotal();
  }
  calculateTotal() {
    this.grandTotal = this.damageProductList?.reduce((total, item) => total + item.totalAmount,0);
  }

  saveDamageEntry(): void {
    if (this.damageEntryForm.invalid) {
      this.damageEntryForm.markAllAsTouched();
      this.toastr.warning('Mandatory Fields Required');
      return;
    }
    if (this.damageProductList?.length <= 0) {
      this.toastr.warning('please choose product variants');
      return;
    }

    const formValue:DamageEntryForm = this.damageEntryForm.getRawValue();
    const formattedData:IDamageEntry = this.mapperService.mapDamageEntrySave(formValue,this.damageProductList,this.grandTotal)
    if(!this.isUpdate){
      this.damageEntryService.saveDamageEntry(formattedData).subscribe((res) => {
        this.toastr.success('damage entry added successfully');
        this.router.navigate(['/inventory/damage-entry'], { relativeTo: this.route });
        this.clear()
      });
      return;
    }
    this.damageEntryService.updateDamageEntry(formattedData).subscribe((res) => {
      this.toastr.success('damage entry Updated successfully');
      this.router.navigate(['/inventory/damage-entry'], { relativeTo: this.route });
      this.clear()
    });

  }
  clear(){
    this.createForm();
    this.damageProductList=[];
    this.selectedVariantsUUID=[];
    this.grandTotal = 0
    this.isUpdate = false
  }

  @ViewChildren('quantityInput') quantityInputs: QueryList<ElementRef>;
  onBarcodeScanned(barcodeData: string) {
    if (!barcodeData) {
      // this.selectedVariants.push(data)
      return;
    }
    this.sub$.sink = this.productService
      .getProductWithBarcode(barcodeData)
      .subscribe((data: ProductBarcode[]) => {
               this.barcodeValue = '';
        if (data && data.length > 0) {
          if (data.length === 1) {
            this.damageProductList.push(this.mapperService.mapToDamageEntryItem(data[0],this.damageEntryUUID,true))
        this.selectedVariantsUUID.push(data[0].productPriceUUID)
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
              this.damageProductList.push(this.mapperService.mapToDamageEntryItem(res,this.damageEntryUUID,true))
        this.selectedVariantsUUID.push(res.productPriceUUID)
              this.calculateTotal()
              this.focusQuantity();
            });
          }
        } else {
          this.toastr.warning('No product found for the given barcode.')
        }
      });
  }

  focusQuantity(){
    setTimeout(() => {
      if (this.damageProductList.length > 0) {
        const lastInput = this.quantityInputs.last.nativeElement;
        this.renderer.selectRootElement(lastInput).focus();
      }
    },2000);
  }

  showBarcodeInput() {
    setTimeout(() => {
      this.focusBarcodeInput();
    });
  }

  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  focusBarcodeInput() {
    if (this.barcodeInput) {
      this.renderer.selectRootElement(this.barcodeInput.nativeElement).focus();
    }
  }


  getDocumentNumber(){
    this.sub$.sink = this.documentService.getNextDocumentNo(DocumentTypeEnum.DAMAGE).subscribe((res:IDocument)=>{
      this.damageEntryForm.patchValue({docNo:res.consolidatedDocumentNo})
    })
  }

  deleteRow(uuid:string){
    this.damageProductList = this.damageProductList.filter(x=>x.productPriceUUID != uuid);
    this.selectedVariantsUUID = this.selectedVariantsUUID.filter(x=>x != uuid);
    this.calculateTotal();
  }
}
