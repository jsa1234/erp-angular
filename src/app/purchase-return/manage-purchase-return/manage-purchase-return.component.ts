import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ColumnDisplaySettings } from '@core/domain-classes/column-display-settings';
import { ColumnVisibility } from '@core/domain-classes/column-visibility.interface';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { InvoiceType } from '@core/domain-classes/enums/invoice-type.enum';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { IPurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { IPurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';
import { ProductModalComponent } from '@shared/components/product-modal/product-modal.component';
import { CalculateAddnlCessAmount, CalculateCessAmount, CalculateCgstAmount, CalculateIgstAmount, CalculateItemTotalAmount, CalculateSgstAmount } from '@shared/helpers/tax-calculation.helper';
import { MapperService } from '@shared/services/mapper.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { v4 as uuid } from 'uuid';
import { PurchaseReturnService } from '../purchase-return.service';
import { PurchaseReturnTableColumns } from './purchase-return-table-columns';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-manage-purchase-return',
  templateUrl: './manage-purchase-return.component.html',
  styleUrls: ['./manage-purchase-return.component.scss']
})
export class ManagePurchaseReturnComponent extends BaseComponent implements OnInit {

  purchaseReturnForm:FormGroup
  deviceUUID: string;
  companyGSTIN: string;
  barcodeValue: string;
  productDetail:any = { quantity: null };
  invoiceTypeList = Object.keys(InvoiceType).filter((key) => !isNaN(Number(InvoiceType[key])));
  selectedVariantsUUID: any;
  dialogRef: MatDialogRef<any>;
  purchaseList: IPurchaseInvoice[];
  purchaseReturnItems: PurchaseReturnDetail[] = [];
  colspan: number;
  columnVisibility:ColumnVisibility = {};
  columns: ColumnDisplaySettings[] = PurchaseReturnTableColumns
  PurchaseReturnTableColumns: ColumnDisplaySettings[];
  selectedPurchase: IPurchaseReturn = {};
  invalidValue: boolean;
  isUpdate: boolean;
  isLoading$:Observable<boolean> = of(false)


  constructor(public translate:TranslationService,private fb:FormBuilder,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private toastr:ToastrService,
    private purchaseReturnService: PurchaseService,
    private mapperService:MapperService,
    securityService: SecurityService,
    private documentService:DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private purchaseReturnServicew:PurchaseReturnService,
    private branchService:BranchService
  ) {
    super();
    this.deviceUUID = securityService.getUserDetail().deviceUUID;
    this.companyGSTIN = securityService.getUserDetail().companyGSTIN;

    this.columns.forEach((column) => {
      this.columnVisibility[column.key] = column.visibleTableColumns; // Initialize visibility
    });
    this.colspan = this.columns.filter(column => column.visibleTableColumns).length
   }

  ngOnInit(): void {
    this.createForm()
    this.getPurchaseReturn()
  }
  createForm() {
    this.purchaseReturnForm = this.fb.group({
      purchaseReturnUUID: [uuid()],
      invoiceType: ['', Validators.required],
      docNo: [{value:'',disabled:true}],
      docDate: [ new Date(), Validators.required],
      refInvNo: ['', Validators.required],
      refInvDate: ['', Validators.required],
      branchUUID: ['', Validators.required],
      deviceUUID: [this.deviceUUID],
      accountUUID: ['', Validators.required],
      transactionMode: ['', Validators.required],
    })
    this.getDocumentNumber()
  }
  get invoiceType() {
    return this.purchaseReturnForm.get('invoiceType').value;
  }
  get isDisabled(): boolean {
    return (
      this.invoiceType === '' ||
      this.invoiceType === null ||
      this.invoiceType === undefined
    );
  }
  onSupplierSelected(supplier:ISupplierAccount) {
    this.autoAssignInvoiceType(supplier.gstVatNo)
    this.getPurchaseInvoicesBySupplier(supplier.accountUUID)
  }

  openProductDialog(){
    const modalData = {
      selectedVariantsUUID: this.selectedVariantsUUID,
      isMulti: false,
    };
    if (!this.dialogRef || !this.dialogRef.componentInstance) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '70%';
      dialogConfig.data = modalData;
      this.dialogRef = this.dialog.open(ProductModalComponent, dialogConfig);
      this.dialogRef.afterClosed().subscribe((product: ProductBarcode[]) => {
        if (!product) return;
        // this.productDetail = this.getPurchaseDetail(product[0]);
        this.dialogRef = null;
        // this.focusQuantity();
      });
    }
  }

  updateAmount(item: PurchaseReturnDetail) {
    item.amount = item.returnQuantity * item.unitPrice;
    item.discountAmount = (item.discountRate / 100) * item.amount
    item.taxableAmount = item.amount - item.discountAmount;
    item.cgstAmount = CalculateCgstAmount(
      item.taxableAmount,
      item.cgstRate,
      this.invoiceType
    );
    item.sgstAmount = CalculateSgstAmount(
      item.taxableAmount,
      item.sgstRate,
      this.invoiceType
    );
    item.igstAmount = CalculateIgstAmount(
      item.taxableAmount,
      item.igstRate,
      this.invoiceType
    );
    item.cessAmount =item?.cessObj? CalculateCessAmount(
      this.invoiceType,
      item.cessObj.taxBehaviour,
      item.cessRate,
      item.taxableAmount,
      item.cgstAmount,
      item.sgstAmount,
      item.igstAmount
    ):0;
    item.addnlCessAmount = item.addnlCessObj?CalculateAddnlCessAmount(
      this.invoiceType,
      item.addnlCessObj.taxBehaviour,
      item.addnlCessRate,
      item.taxableAmount,
      item.cgstAmount,
      item.sgstAmount,
      item.igstAmount
    ):0;
    item.itemTotalAmount = CalculateItemTotalAmount(
      item.taxableAmount,
      item.cgstAmount,
      item.sgstAmount,
      item.igstAmount,
      item.cessAmount,
      item.addnlCessAmount,
      this.invoiceType
    );

    this.calculateTotal()
  }

  getPurchaseInvoicesBySupplier(supplierUUID:string){
    this.purchaseList = []
    this.sub$.sink = this.purchaseReturnService.getPurchaseInvoicesBySupplier(supplierUUID).subscribe((res:IPurchaseInvoice[])=>{
      this.purchaseList = res
    })
  }




  autoAssignInvoiceType(supplierGSTNo: string) {
    const invoiceTypeControl = this.purchaseReturnForm.get('invoiceType');
    invoiceTypeControl.disable();
    if (!supplierGSTNo) {
      invoiceTypeControl.setValue(InvoiceType.B2C);
      return;
    }
    const isSameState = supplierGSTNo.substring(0, 2) === this.companyGSTIN.substring(0, 2);
    const assignedInvoiceType = isSameState ? InvoiceType.B2B : InvoiceType.B2BIS;
    invoiceTypeControl.setValue(assignedInvoiceType);
  }


  onPurchaseSelected(docNo: string) {
    this.purchaseReturnItems = []
    this.validationMessages = {}
    const purchase = this.purchaseList.find(item => item.docNo === docNo);
    this.selectedPurchase = this.mapperService.mapPurchaseReturn(purchase)

    if (this.selectedPurchase) {
      this.purchaseReturnForm.get('refInvDate').setValue(new Date(this.selectedPurchase.refInvDate));
      this.purchaseReturnForm.get('branchUUID').setValue(purchase.branchUUID);
    }
    this.getPurchaseItems(purchase.purchaseInvoiceUUID)
  }

  getPurchaseItems(purchaseInvoiceUUID:string){
    this.purchaseReturnService.getPurchaseInvoicetems(purchaseInvoiceUUID).subscribe((res:PurchaseInvoiceDetail[])=>{
      this.purchaseReturnItems =  this.mapperService.mapArrayToPurchaseReturnItems(res)
    })
  }
  onCheckboxValueChanged(key: string, isChecked: boolean) {
    this.columnVisibility[key] = isChecked;
    this.colspan = Object.values(this.columnVisibility).filter(res =>res === true).length
  }
  
  deleteRow(index: number) {
    if (index === this.currentRowIndex) {
      this.currentRowIndex = -1;
    }
    this.purchaseReturnItems.splice(index, 1);

    this.currentRowIndex = 0
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    console.log(event.key)
    event.preventDefault();
    if (this.currentRowIndex < this.purchaseReturnItems.length - 1) {
      this.currentRowIndex++;
      this.setFocusOnReturnQuantityInput();
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    if (this.currentRowIndex > 0) {
      this.currentRowIndex--;
      this.setFocusOnReturnQuantityInput();
    }
  }
  @HostListener('document:keydown.control.Delete', ['$event'])
  onDelete(event: KeyboardEvent) {
    event.preventDefault();
    this.deleteRow(this.currentRowIndex)
    this.setFocusOnReturnQuantityInput()
  }

  private setFocusOnReturnQuantityInput() {
    if (this.returnQuantityInputs && this.returnQuantityInputs.length > 0) {
      const inputElement = this.returnQuantityInputs.toArray()[this.currentRowIndex];
      if (inputElement) {
        this.renderer.selectRootElement(inputElement.nativeElement).focus();
      }
    }
  }
  currentRowIndex: number = -1;

  @HostListener('document:keydown.control.F10', ['$event'])
  onFocusFirstRow(event: KeyboardEvent) {
    event.preventDefault();
    this.currentRowIndex = 0;
    this.setFocusOnReturnQuantityInput();
  }
  
  @ViewChildren('returnQuantityInput') returnQuantityInputs: QueryList<ElementRef>;

  validationMessages: { [key: string]: string } = {};

  validateReturnQuantity(item: PurchaseReturnDetail) {
    if (item.returnQuantity > item.quantity) {
      this.validationMessages[item.productPriceUUID] = 'Return Quantity cannot be greater than Quantity.';
    } else if(item.returnQuantity <0) {
      this.validationMessages[item.productPriceUUID] = 'Return Quantity cannot be Negative Value.';
    }
    else if(item.returnQuantity==null){
      this.validationMessages[item.productPriceUUID] = 'Return Quantity cannot be empty.';
    }
    else{
      this.validationMessages[item.productPriceUUID] = '';
      this.updateAmount(item)
    }
  }


  savePurchaseReturn(){
    if(this.purchaseReturnForm.invalid){
      this.purchaseReturnForm.markAllAsTouched();
      return;
    }
    if(this.purchaseReturnItems.length<=0){
      this.toastr.warning('choose atleaset one item to return');
      return;
    }
    const allReturnQuantitiesZero = this.purchaseReturnItems.every(
      (item) => item.returnQuantity === 0
    );
    if (allReturnQuantitiesZero) {
      this.toastr.error('At least one item must have a return quantity greater than 0.');
      return;
    }

    const hasValidationErrors = Object.values(this.validationMessages).some(message => message !== '');
    if (hasValidationErrors) {
      this.toastr.error('Validation errors. Please fix the issues before saving.');
      return;
    }

    this.isLoading$ = of(true)
    const item = this.mapperService.mapPurchaseReturnSave(this.purchaseReturnForm.getRawValue(),this.purchaseReturnItems,this.selectedPurchase)

    this.isUpdate?this.updatePurchaseReturn(item):this.createPurchaseReturn(item)
    
  }

  createPurchaseReturn(purchaseReturnItem:IPurchaseReturn){
    this.purchaseReturnServicew.addPurchaseReturn(purchaseReturnItem).subscribe(
      (response) => {
        // Handle successful response
        this.toastr.success('Purchase return added successfully');
    this.isLoading$ = of(false)

        this.router.navigate(['/purchase-return/list'], {
          relativeTo: this.route,
        });

      },
      () => {
        // Handle error
        this.toastr.error('Some thing Went Wrong, Try Again Later');
    this.isLoading$ = of(false)

      }
    );
  }
  updatePurchaseReturn(purchaseReturnItem:IPurchaseReturn){
    this.purchaseReturnServicew.updatePurchaseReturn(purchaseReturnItem).subscribe(
      (response) => {
      this.toastr.success('Purchase return Updated successfully');
      this.isLoading$ = of(false)

        this.router.navigate(['/purchase-return/list'], {
          relativeTo: this.route,
        });

      },
      () => {
        this.toastr.error('Some thing Went Wrong, Try Again Later');
    this.isLoading$ = of(false)

      }
    );
  }
  
  calculateTotal(): void {
    this.selectedPurchase.grossAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.taxableAmount,
      0
    );

    this.selectedPurchase.subTotal = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.amount,
      0
    );

    this.selectedPurchase.discountAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.discountAmount,
      0
    );

    this.selectedPurchase.cgstAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.cgstAmount,
      0
    );

    this.selectedPurchase.sgstAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.sgstAmount,
      0
    );

    this.selectedPurchase.igstAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.igstAmount,
      0
    );

    this.selectedPurchase.cessAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.cessAmount,
      0
    );

   this.selectedPurchase.addnlCessAmount = this.purchaseReturnItems?.reduce(
      (total, item) => total + item.addnlCessAmount,
      0
    );

    this.selectedPurchase.netTotalAmount =
      this.purchaseReturnItems?.reduce(
        (total, item) => total + item.itemTotalAmount,
        0
      ) +
      this.selectedPurchase.transExpense +
      this.selectedPurchase.otherExpense;

    this.selectedPurchase.roundNetTotalAmount =
      this.purchaseReturnItems?.reduce(
        (total, item) => total + item.itemTotalAmount,
        0
      ) +
      this.selectedPurchase.transExpense +
      this.selectedPurchase.otherExpense-
      this.selectedPurchase.roundOff;
      }


      validateRoundoff() {
        if (this.selectedPurchase.roundOff < 0 || this.selectedPurchase.roundOff > 1) {
          this.invalidValue = true;
        } else {
          this.invalidValue = false;
          this.calculateTotal();
        }
      }


      getDocumentNumber(){
        this.sub$.sink = this.documentService.getNextDocumentNo(DocumentTypeEnum.PURCRETURN).subscribe((res:IDocument)=>{
          this.purchaseReturnForm.patchValue({docNo:res.consolidatedDocumentNo})
        })
      }

      getPurchaseReturn():void{
        this.sub$.sink = this.route.data.subscribe((data:{purchaseReturn:IPurchaseReturn})=>{
          if(!data.purchaseReturn){
            this.createForm();
            this.isUpdate = false
            this.branchService.isHeadOfficeSubject$.next(false);
            this.purchaseReturnItems = []
          this.calculateTotal()
    
            return;
          }
          this.isUpdate = true
          this.branchService.isHeadOfficeSubject$.next(false);
          this.purchaseReturnForm.patchValue(data.purchaseReturn)
          this.getPurchaseInvoicesBySupplier(data.purchaseReturn.accountUUID)
          this.purchaseReturnItems = data.purchaseReturn.purchaseReturnDetails
          this.selectedPurchase = data.purchaseReturn
          this.selectedPurchase.roundOff =  this.selectedPurchase.roundOff || 0
          this.calculateTotal()
        })
      }
      restrictToInteger(event: KeyboardEvent): void {
        const charCode = event.which ? event.which : event.keyCode;
      
        // Allow only digits (0-9) and control keys like backspace
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
        }
      }
}
