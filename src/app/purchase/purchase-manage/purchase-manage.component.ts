import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { InvoiceType } from '@core/domain-classes/enums/invoice-type.enum';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { IPurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { ProductModalComponent } from '@shared/components/product-modal/product-modal.component';
import {
  CalculateAddnlCessAmount,
  CalculateCessAmount,
  CalculateCgstAmount,
  CalculateIgstAmount,
  CalculateItemTotalAmount,
  CalculateSgstAmount,
} from '@shared/helpers/tax-calculation.helper';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { ProductService } from 'src/app/product/product.service';
import { v4 as uuid } from 'uuid';
import { PurchaseService } from '../purchase.service';
import { PriceUpdateDialogComponent } from './price-update-dialog/price-update-dialog.component';
import { PriceObject } from './price.type';
import { PurchaseForm } from './purchaseForm.interface';
import { BarcodeProductModalComponent } from '@shared/components/barcode-product-modal/barcode-product-modal.component';
import { HelpModalComponent } from '@shared/components/help-modal/help-modal.component';
@Component({
  selector: 'app-purchase-manage',
  templateUrl: './purchase-manage.component.html',
  styleUrls: ['./purchase-manage.component.scss'],
})
export class PurchaseManageComponent extends BaseComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  @ViewChildren('quantityInput') quantityInputs: QueryList<ElementRef>;
  displayedColumns = [
    'slNo',
    'productCode',
    'productName',
    'quantity',
    'unitPrice',
    'discountAmount',
    'cgstAmount',
    'sgstAmount',
    'igstAmount',
    'cessAmount',
    'addnlCessAmount',
    'itemTotalAmount',
  ];
  dataSource: PurchaseInvoiceDetail[] = [];
  matTableDataSource = new MatTableDataSource<PurchaseInvoiceDetail>(
    this.dataSource
  );
  dialogRef: MatDialogRef<any>;
  barcodeValue: string;
  totalCgst: number = 0;
  totalSgst: number = 0;
  totalIgst: number = 0;
  totalCess: number = 0;
  totalAddnlCess: number = 0;
  itemTotalAmount: number = 0;
  selectedRow: PurchaseInvoiceDetail;
  otherExpense: number=0;
  transExpense: number=0;
  roundoff: number=0;
  purchaseAddForm: FormGroup;
  selectedVariantsUUID: string[] = [];
  subtotal: number = 0;
  totalDiscount: number = 0;
  invalidValue: boolean;
  totalQuantity: number = 0;
  invoiceTypeList = Object.keys(InvoiceType).filter(
    (key) => !isNaN(Number(InvoiceType[key]))
  );
  deviceUUID: string = '';
  productDetail: PurchaseInvoiceDetail = { quantity: null };
  remark: string = '';
  itemRoundTotalAmount: number = 0;
  taxableAmount: number = 0;
  companyGSTIN: string;
  isUpdate: boolean = false;
  isDefaultBranch: boolean = true;
  isDefaultDate: boolean = true;
  isInvalidQuantity: boolean = false;
  docDate: Date = null;
  refBillDate: Date = null;
  isExpanded = false;
   isLoading: boolean = false;
  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onBarcodeScanned(this.barcodeValue);
    } else if (event.key.toLowerCase() === 'f2') {
      this.showBarcodeInput();
    } else if (event.key.toLowerCase() === 'f9') {
      if (this.isDisabled) return;
      if (!this.dialogRef || !this.dialogRef.componentInstance) {
        // No dialog is open, so open it
        this.openProductDialog();
      }
    } else if (event.key.toLowerCase() === 'escape') {
      this.clear();
    } else if (event.altKey && event.key.toLocaleLowerCase() === 'a') {
      this.addtoTable();
    } else if (event.altKey && event.key.toLocaleLowerCase() === 's') {
      this.addPurchaseInvoice();
    }
  }
  columnVisibility: { [key: string]: boolean } = {};
  constructor(
    public translate: TranslationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private clonerService: ClonerService,
    private commonDialog: CommonDialogService,
    securityService: SecurityService,
    private documentService: DocumentService
  ) {
    super();
    this.deviceUUID = securityService.getUserDetail().deviceUUID;
    this.companyGSTIN = securityService.getUserDetail().companyGSTIN;
  }

  ngOnInit(): void {
    this.createPurchaseForm();
    this.getPurchaseInvoice();
  }
  createPurchaseForm(): void {
    this.purchaseAddForm = this.fb.group({
      purchaseInvoiceUUID: [uuid()],
      invoiceType: ['', Validators.required],
      docNo: [{ value: '', disabled: true }],
      docDate: [new Date(), Validators.required],
      refBillNo: [''],
      refBillDate: ['', Validators.required],
      branchUUID: ['', Validators.required],
      deviceUUID: [this.deviceUUID],
      accountUUID: ['', Validators.required],
      transactionMode: ['', Validators.required],
    });
    this.getDocumentNumber();
  }

  get invoiceType() {
    return this.purchaseAddForm.get('invoiceType').value;
  }
  get isDisabled(): boolean {
    return (
      this.invoiceType === '' ||
      this.invoiceType === null ||
      this.invoiceType === undefined
    );
  }
  showBarcodeInput() {
    setTimeout(() => {
      this.focusBarcodeInput();
    });
  }

  openProductDialog() {
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
        this.productDetail = this.getPurchaseDetail(product[0]);
        this.dialogRef = null;
        this.focusQuantity();
      });
    }
  }
  getPurchaseDetail(productDetail: ProductBarcode): PurchaseInvoiceDetail {
    let purchaseItem: PurchaseInvoiceDetail;
    this.purchaseService
      .generateBarcodeSearchProductData(
        productDetail,
        this.purchaseAddForm,
        this.deviceUUID
      )
      .subscribe((res: PurchaseInvoiceDetail) => {
        purchaseItem = res;
      });
    return purchaseItem;
  }
  addPurchaseInvoice(): void {
    if (this.purchaseAddForm.invalid) {
      this.purchaseAddForm.markAllAsTouched();
      return;
    }
    if (this.matTableDataSource.data.length <= 0) {
      this.toastr.warning('please choose variants');
      return;
    }
    const formData: PurchaseForm = this.purchaseAddForm.getRawValue();
    this.isLoading = true;
    const purchaseInvoiceItems: PurchaseInvoiceDetail[] =
      this.matTableDataSource.data.map((item) => ({
        ...item,
        branchUUID: this.purchaseAddForm.get('branchUUID').value,
      }));

    const priceObject: PriceObject = this.generatePriceObject();

    const purchaseInvoice = this.purchaseService.createPurchaseInvoiceData(
      formData,
      purchaseInvoiceItems,
      priceObject
    );

    if (this.isUpdate) {
      this.purchaseService
        .updatePurchaseInvoice(purchaseInvoice)
        .subscribe((res: any) => {
          this.isLoading=false;
          this.toastr.success('Purchase Updated Successfully');
          this.router.navigate(['/purchase-invoice/list'], {
            relativeTo: this.route,
          });
        });
    } else {
      this.purchaseService
        .addPurchaseInvoice(purchaseInvoice)
        .subscribe((res: IPurchaseInvoice) => {
          this.isLoading=false;
          this.toastr.success('Purchase Added Successfully');
          const isPriceUpdated = res.purchaseInvoiceDetails.some(
            (x) => x.priceUpdated === true
          );
          if (!isPriceUpdated) {
            this.router.navigate(['/purchase-invoice/list']);
            return;
          }
          const rateUpdatedProducts = res.purchaseInvoiceDetails.filter(
            (x) => x.priceUpdated === true
          );
          this.openRateUpdateDialog(rateUpdatedProducts);
        });
    }
  }

  openRateUpdateDialog(purchaseInvoiceDetail: PurchaseInvoiceDetail[]): void {
    const dialogRef = this.dialog.open(PriceUpdateDialogComponent, {
      width: '100%',
      disableClose: true,
      data: purchaseInvoiceDetail,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/purchase-invoice/list']);
    });
  }

  updateDiscountAmount(item: PurchaseInvoiceDetail) {
    item.discountAmount = +((item.discountRate / 100) * item.amount).toFixed(2);
    this.updateTaxAmount(item);
  }
  updateAmount(item: PurchaseInvoiceDetail) {
    if (item.quantity <= 0) {
      this.isInvalidQuantity = true;
      return;
    }
    this.isInvalidQuantity = false;
    item.amount = +(item.quantity * item.unitPrice).toFixed(2);
    this.updateDiscountAmount(item);
    this.updateTaxAmount(item);
  }
  updateTaxAmount(item: PurchaseInvoiceDetail) {
    item.taxableAmount = +(item.amount - item.discountAmount).toFixed(2);
    item.cgstAmount = +CalculateCgstAmount(
      item.taxableAmount,
      item.cgstRate,
      this.invoiceType
    ).toFixed(2);
    item.sgstAmount = +CalculateSgstAmount(
      item.taxableAmount,
      item.sgstRate,
      this.invoiceType
    ).toFixed(2);
    item.igstAmount = +CalculateIgstAmount(
      item.taxableAmount,
      item.igstRate,
      this.invoiceType
    ).toFixed(2);
    item.cessAmount = item?.cessObj
      ? +CalculateCessAmount(
          this.invoiceType,
          item.cessObj.taxBehaviour,
          item.cessRate,
          item.taxableAmount,
          item.cgstAmount,
          item.sgstAmount,
          item.igstAmount
        ).toFixed(2)
      : 0;
    item.addnlCessAmount = item.addnlCessObj
      ? +CalculateAddnlCessAmount(
          this.invoiceType,
          item.addnlCessObj.taxBehaviour,
          item.addnlCessRate,
          item.taxableAmount,
          item.cgstAmount,
          item.sgstAmount,
          item.igstAmount
        ).toFixed(2)
      : 0;
    item.itemTotalAmount = +CalculateItemTotalAmount(
      item.taxableAmount,
      item.cgstAmount,
      item.sgstAmount,
      item.igstAmount,
      item.cessAmount,
      item.addnlCessAmount,
      this.invoiceType
    ).toFixed(2);
  }
  updateDiscountRate(item: PurchaseInvoiceDetail) {
    item.discountRate = +((item.discountAmount / item.amount) * 100).toFixed(2);
    this.updateTaxAmount(item);
  }

  validateRoundoff() {
    if (this.roundoff < 0 || this.roundoff > 1) {
      this.invalidValue = true;
      // this.roundoff = 0; // Reset the value to null or any default value
    } else {
      this.invalidValue = false;
      this.calculateTotal();
    }
  }
  focusBarcodeInput() {
    if (this.barcodeInput) {
      this.renderer.selectRootElement(this.barcodeInput.nativeElement).focus();
    }
  }

  // onBarcodeScanned(barcodeData: string) {
  //   if (!barcodeData) {
  //     return;
  //   }
  //   this.sub$.sink = this.productService
  //     .getProductWithBarcode(barcodeData)
  //     .subscribe((res: ProductBarcode[]) => {
  //       this.productDetail = this.getPurchaseDetail(res[0]);
  //       this.barcodeValue = '';
  //     });
  //   this.focusQuantity();
  // }

  onBarcodeScanned(barcodeData: string) {
    if (!barcodeData) {
      return;
    }
  
    this.sub$.sink = this.productService
      .getProductWithBarcode(barcodeData)
      .subscribe((products: ProductBarcode[]) => {
        this.barcodeValue = '';
        if (products && products.length > 0) {
          if (products.length === 1) {
            // Only one item, set products detail and clear barcodeValue
            this.productDetail = this.getPurchaseDetail(products[0]);
            this.focusQuantity();
          } else {
            // Multiple items, open modal
            const dialogRef = this.dialog.open(BarcodeProductModalComponent, {
              width: '100%',
              disableClose: true,
              data: products,
            });
        
            dialogRef.afterClosed().subscribe((res:ProductBarcode) => {
            this.productDetail = this.getPurchaseDetail(res);
            this.focusQuantity();
            });
          }
        } else {
          // No items, show console error or handle the error as needed
          this.toastr.warning('No product found for the given barcode.')
        }
      });
  }
  

  // openMultiBarcodeProductModal(data:ProductBarcode[]){
  //   const dialogRef = this.dialog.open(BarcodeProductModalComponent, {
  //     width: '100%',
  //     disableClose: true,
  //     data: data,
  //   });

  //   dialogRef.afterClosed().subscribe((res:ProductBarcode) => {

  //   });
  // }

  focusQuantity(): void {
    setTimeout(() => {
      if (this.productDetail.productPriceUUID) {
        const lastInput = this.quantityInputs.last.nativeElement;
        this.renderer.selectRootElement(lastInput).focus();
      }
    }, 100);
  }
  addtoTable() {
    if(this.productDetail.manufactureDate > this.productDetail.expiryDate){
      this.toastr.warning('Manufacturer date cannot be after expiry date');
      return;

    }
    if (!this.productDetail.productPriceUUID) {
      return;
    }
    if (this.isInvalidQuantity) {
      this.toastr.warning('Enter Valid Quantity');
      return;
    }
    const existingRecordIndex = this.dataSource.findIndex(
      (record) =>
        record.productPriceUUID === this.productDetail.productPriceUUID
    );
    if (existingRecordIndex !== -1) {
      this.dataSource[existingRecordIndex] =
        this.clonerService.deepClone<PurchaseInvoiceDetail>(this.productDetail);
    } else {
      this.dataSource.push(
        this.clonerService.deepClone<PurchaseInvoiceDetail>(this.productDetail)
      );
      this.selectedVariantsUUID.push(this.productDetail.productPriceUUID);
    }
    this.matTableDataSource.data = [...this.dataSource];
    this.productDetail = { quantity: null };
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalQuantity = this.matTableDataSource.data?.reduce(
      (total, item) => total + item.quantity,
      0
    );


    this.taxableAmount = this.matTableDataSource.data?.reduce((total, item) => {
      const taxableAmount =
        item.taxableAmount !== undefined
          ? total + item.taxableAmount
          : total + (item.amount - item.discountAmount);
      return +taxableAmount.toFixed(2); // Optimize toFixed() call
    }, 0);


    this.subtotal = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.amount,
      0
    )).toFixed(2);

    this.totalDiscount = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.discountAmount,
      0
    )).toFixed(2);

    this.totalCgst = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.cgstAmount,
      0
    )).toFixed(2);

    this.totalSgst = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.sgstAmount,
      0
    )).toFixed(2);

    this.totalIgst = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.igstAmount,
      0
    )).toFixed(2);

    this.totalCess = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.cessAmount,
      0
    )).toFixed(2);

    this.totalAddnlCess = +(this.matTableDataSource.data?.reduce(
      (total, item) => total + item.addnlCessAmount,
      0
    )).toFixed(2);

    this.itemTotalAmount = +(
      this.matTableDataSource.data?.reduce(
        (total, item) => total + item.itemTotalAmount,
        0
      ) +
      this.transExpense +
      this.otherExpense
    ).toFixed(2);

    this.itemRoundTotalAmount = +(
      this.matTableDataSource.data?.reduce(
        (total, item) => total + item.itemTotalAmount,
        0
      ) +
      this.transExpense +
      this.otherExpense -
      this.roundoff
    ).toFixed(2);
  }

  editRow(data: PurchaseInvoiceDetail): void {
    this.productDetail =
      this.clonerService.deepClone<PurchaseInvoiceDetail>(data);
    this.selectedRow = data;
  }

  clear(): void {
    this.productDetail = { quantity: null };
  }

  generatePriceObject(): PriceObject {
    return {
      cessAmount: this.totalCess,
      cgstAmount: this.totalCgst,
      discountAmount: this.totalDiscount,
      grossAmount: this.taxableAmount,
      igstAmount: this.totalIgst,
      netTotalAmount: this.itemTotalAmount,
      otherExpense: this.otherExpense,
      roundedNetTotalAmount: this.itemRoundTotalAmount,
      roundOff: this.roundoff,
      sgstAmount: this.totalSgst,
      subTotal: this.subtotal,
      transExpense: this.transExpense,
      addnlCessAmount: this.totalAddnlCess,
      remark: this.remark,
    };
  }
  deleteRow(purchaseItem: PurchaseInvoiceDetail): void {
    const areU = this.translate.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.commonDialog.dialogConfig.hasBackdrop = true;
    this.commonDialog.dialogConfig.disableClose = true;
    this.sub$.sink = this.commonDialog
      .deleteConformationDialog(`${areU} :: ${purchaseItem.barcode}`)
      .subscribe((isTrue) => {
        if (isTrue) {
          const index = this.matTableDataSource.data.indexOf(purchaseItem);
          if (index > -1) {
            this.clear();
            this.selectedVariantsUUID.splice(index);
            this.dataSource.splice(index, 1);
            this.matTableDataSource.data.splice(index, 1);
            this.matTableDataSource._updateChangeSubscription(); // Refresh the data source
            this.calculateTotal();
          }
        }
      });
  }

  onSupplierSelected(supplier: ISupplierAccount) {
    const gstNo: string = supplier.gstVatNo;
    this.purchaseAddForm.get('invoiceType').disable();
    if (!gstNo) {
      this.purchaseAddForm.patchValue({ invoiceType: InvoiceType.B2C });
      return;
    }
    if (gstNo.substring(0, 2) == this.companyGSTIN.substring(0, 2)) {
      this.purchaseAddForm.patchValue({ invoiceType: InvoiceType.B2B });
    } else {
      this.purchaseAddForm.patchValue({ invoiceType: InvoiceType.B2BIS });
    }
  }

  getDocumentNumber() {
    this.sub$.sink = this.documentService
      .getNextDocumentNo(DocumentTypeEnum.PURCHASE)
      .subscribe((res: IDocument) => {
        this.purchaseAddForm.patchValue({ docNo: res.consolidatedDocumentNo });
      });
  }

  getPurchaseInvoice(): void {
    this.sub$.sink = this.route.data.subscribe(
      (data: { purchaseInvoice: IPurchaseInvoice }) => {
        if (!data.purchaseInvoice) {
          this.createPurchaseForm();
          this.isUpdate = false;
          this.remark = '';
          this.matTableDataSource.data = [];
          this.isDefaultBranch = true;
          this.isDefaultDate = true;
          this.calculateTotal();

          return;
        }
        this.isUpdate = true;
        this.isDefaultBranch = false;
        this.isDefaultDate = false;
        this.docDate = data.purchaseInvoice.docDate;
        this.refBillDate = data.purchaseInvoice.refBillDate;
        this.purchaseAddForm.patchValue(data.purchaseInvoice);
        this.remark = data.purchaseInvoice.remark;
        this.transExpense = data.purchaseInvoice.transExpense;
        this.otherExpense = data.purchaseInvoice.otherExpense;
        this.roundoff = data.purchaseInvoice.roundOff ?? 0;
        this.dataSource.push(...data.purchaseInvoice.purchaseInvoiceDetails);
        this.matTableDataSource.data =
          data.purchaseInvoice.purchaseInvoiceDetails;
        this.selectedVariantsUUID =
          data.purchaseInvoice.purchaseInvoiceDetails.map(
            (x) => x.productPriceUUID
          );
        this.calculateTotal();
      }
    );
  }

  onInputFocus(input: NgModel): void {
    if (input.value === 0) {
      input.reset(null); // Clear the value
    }
  }

  onInputBlur(input: NgModel): void {
    if (input.value === null || input.value === '') {
      input.reset(0); // Set the value to 0 if it's empty
    }
  }
  openHelpDialog(){
    this.dialog
    .open(HelpModalComponent, {
      //width: '550px'
    })
    .afterClosed()
  }

}
