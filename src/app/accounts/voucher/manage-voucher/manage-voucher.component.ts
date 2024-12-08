import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { AccountHeadService } from '../../accounts/account-head.service';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { v4 as uuid } from 'uuid';
import { VoucherService } from '../voucher.service';
import { IVoucher } from '@core/domain-classes/voucher';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { TransactionMode } from '@core/domain-classes/enums/transaction-mode-enum';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { IDocument } from '@core/domain-classes/document-info';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrls: ['./manage-voucher.component.scss'],
})
export class ManageVoucherComponent extends BaseComponent implements OnInit {
  paymentVoucherForm: FormGroup;
  accountHeadList: AccountHeadTree[] = [];
  accountHeads: AccountHeadTree[] = [];
  isUpdate: boolean = false;
  branchUUID:string;
  deviceUUID:string;
  isLoading$:Observable<boolean>
  searchControl: FormControl = new FormControl('');

  constructor(
    public translate: TranslationService,
    private fb: FormBuilder,
    private accountheadService: AccountHeadService,
    private voucherService: VoucherService,
    private toastr: ToastrService,
    private router: Router,
    private securityService: SecurityService,
    private route:ActivatedRoute,
    private documentService:DocumentService,
  ) {
    super();
    this.branchUUID= this.securityService.getUserDetail().branchUUID
    this.deviceUUID= this.securityService.getUserDetail().deviceUUID
  }

  ngOnInit(): void {
    this.createForm()
    this.getPaymentVoucher()
    this.getAllLevelThreeAccountHeads();

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.accountHeadList = this.filterAccountHead(searchTerm);
    });
  }


  filterAccountHead(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.accountHeads;
    } else {
      // Filter by brand name containing the search term
      return this.accountHeads.filter((accountHead) =>
        accountHead.nameEnglish.toLowerCase().includes(searchTerm) ||
        accountHead.accountCode.toLowerCase().includes(searchTerm) 
      );
    }
  }


  createForm(): void {
    this.paymentVoucherForm = this.fb.group({
      accountVoucherUUID: [uuid()],
      branchUUID: [this.branchUUID],
      deviceUUID: [this.deviceUUID],
      docNo: [{value:'',disabled:true}],
      docDate: [''],
      transactionMode: [{ value: TransactionMode.CASH, disabled: false }],
      description: [''],
      totalAmount: [0],
      accountVoucherDetails: this.fb.array([this.createRow()]),
    });

    this.tableRows.valueChanges.subscribe(() => {
      this.paymentVoucherForm
        .get('totalAmount')
        .patchValue(this.calculateTotal());
    });
  }

  createRow() {
    return this.fb.group({
      accountVoucherDetailUUID: new FormControl(uuid()),
      accountUUID: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      branchUUID: new FormControl(this.branchUUID),
      deviceUUID: new FormControl(this.deviceUUID),
    });
  }

  get tableRows() {
    return this.paymentVoucherForm.get('accountVoucherDetails') as FormArray;
  }

  addRow() {
    this.tableRows.push(this.createRow());
  }

  removeRow(index: number) {
    this.tableRows.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal() {
    let sum = 0;
    this.tableRows.controls.forEach((row) => {
      sum += +row.get('amount').value || 0;
    });

    return sum;
  }

  saveVoucher() {
    if (this.paymentVoucherForm.invalid) {
      this.paymentVoucherForm.markAllAsTouched();
      return;
    }

    const formData: IVoucher = this.paymentVoucherForm.getRawValue();
    this.isUpdate ? this.updateVoucher(formData) : this.createVoucher(formData);
  }

  createVoucher(voucherData: IVoucher) {
    this.voucherService.createPaymentVoucher(voucherData).subscribe(() => {
      this.toastr.success('Voucher Created Successfully');
      this.router.navigate(['/paymentVoucher']);
    },
    ()=>{
      this.toastr.success('Something went Wrong, Try Again','Failed')
    });
  }
  updateVoucher(voucherData: IVoucher) {
    this.voucherService.updatePaymentVoucher(voucherData).subscribe(() => {
      this.toastr.success('Voucher Created Successfully');
      this.router.navigate(['/paymentVoucher']);
    },
    ()=>{
      this.toastr.success('Something went Wrong, Try Again','Failed')
    });
  }

  getAllLevelThreeAccountHeads() {
    this.isLoading$ = of(true)
    this.accountheadService.getAllLevelThreeAccountHeads().subscribe((res: AccountHeadTree[]) => {
      this.accountHeads = res
      this.accountHeadList = this.filterAccountHead('');
    this.isLoading$ = of(false)

      },
      ()=>{
    this.isLoading$ = of(false)
    this.toastr.error('Something wrong when loading account heads, Try again')
      });
  }
  getPaymentVoucher(): void {
    this.isLoading$ = of(true)
    this.route.data.subscribe((data: { voucher: IVoucher }) => {
      if (!data.voucher) {
        this.createForm();
        this.getDocumentNumber()
        this.isUpdate = false;
    this.isLoading$ = of(false)
        return;
      }
  
      this.isUpdate = true;
  
      this.paymentVoucherForm.patchValue(data.voucher);
  
      // Handle the dynamic array
      const dynamicArrayData = data.voucher.accountVoucherDetails; // Replace with your actual data source
  
      // Clear existing form controls in the dynamic array
      while (this.tableRows.length) {
        this.tableRows.removeAt(0);
      }
  
      // Add form controls for each item in the dynamic array
      dynamicArrayData.forEach((item) => {
        this.addRow();
        const rowIndex = this.tableRows.length - 1; // Get the index of the newly added row
        this.tableRows.at(rowIndex).patchValue(item);
      });
      this.isLoading$ = of(false)
    });
  }
  getDocumentNumber(){
    this.isLoading$ = of(true)
    this.sub$.sink = this.documentService.getNextDocumentNo(DocumentTypeEnum.PAYMENTVOUCH).subscribe((res:IDocument)=>{
      this.paymentVoucherForm.patchValue({docNo:res.consolidatedDocumentNo})
    this.isLoading$ = of(false)
    },
    ()=>{
    this.isLoading$ = of(false)
    this.toastr.error('Something wrong when loading document number, Try again')

    })
  }

}
