import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ReceiptService } from '../receipt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { ToastrService } from 'ngx-toastr';
import { AccountHeadService } from '../../accounts/account-head.service';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { v4 as uuid } from 'uuid';
import { IVoucher } from '@core/domain-classes/voucher';
import { TransactionMode } from '@core/domain-classes/enums/transaction-mode-enum';
import { DocumentService } from 'src/app/document/document.service';
import { BaseComponent } from 'src/app/base.component';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';

@Component({
  selector: 'app-manage-receipt',
  templateUrl: './manage-receipt.component.html',
  styleUrls: ['./manage-receipt.component.scss']
})
export class ManageReceiptComponent extends BaseComponent implements OnInit {

  receiptVoucherForm:FormGroup
  accountHeadList: AccountHeadTree[] = [];
  isUpdate: boolean = false;
  branchUUID = this.securityService.getUserDetail().branchUUID
  deviceUUID = this.securityService.getUserDetail().deviceUUID
  document: IDocument;
  accountHeads: AccountHeadTree[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(    public translate: TranslationService,
    private fb: FormBuilder,
    private accountheadService: AccountHeadService,
    private voucherService: ReceiptService,
    private toastr: ToastrService,
    private router: Router,
    private securityService: SecurityService,
    private documentService:DocumentService,
    private route:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getReceiptVoucher();
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


  createForm():void{
    this.receiptVoucherForm = this.fb.group({
      accountVoucherUUID: [uuid()],
      branchUUID: [this.branchUUID],
      deviceUUID: [this.deviceUUID],
      docNo: [{value:'',disabled:true}],
      docDate: [''],
      mode: [{ value: TransactionMode.CASH, disabled: true }],
      description: [''],
      totalAmount: [0],
      accountVoucherDetails: this.fb.array([this.createRow()]),
    })
    this.tableRows.valueChanges.subscribe(() => {
      this.receiptVoucherForm
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
    return this.receiptVoucherForm.get('accountVoucherDetails') as FormArray;
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
    if (this.receiptVoucherForm.invalid) {
      this.receiptVoucherForm.markAllAsTouched();
      return;
    }

    const formData: IVoucher = this.receiptVoucherForm.getRawValue();
    this.isUpdate ? this.updateVoucher(formData) : this.createVoucher(formData);
  }

  createVoucher(voucherData: IVoucher) {
    this.voucherService.createReceiptVoucher(voucherData).subscribe(() => {
      this.toastr.success('Receipt Created Successfully');
      this.router.navigate(['/receiptVoucher']);
    });
  }
  updateVoucher(voucherData: IVoucher) {
    this.voucherService.updateReceiptVoucher(voucherData).subscribe(() => {
      this.toastr.success('Receipt Updated Successfully');
      this.router.navigate(['/receiptVoucher']);
    });
  }

  getAllLevelThreeAccountHeads() {
    this.accountheadService
      .getAllLevelThreeAccountHeads()
      .subscribe((res: AccountHeadTree[]) => {
        this.accountHeads = res
        this.accountHeadList = this.filterAccountHead('');
    });
  }
  getReceiptVoucher(): void {
    this.route.data.subscribe((data: { receipt: IVoucher }) => {
      if (!data.receipt) {
        this.createForm();
    this.getDocumentNumber();
        this.isUpdate = false;
        return;
      }
  
      this.isUpdate = true;
  
      this.receiptVoucherForm.patchValue(data.receipt);
  
      // Handle the dynamic array
      const dynamicArrayData = data.receipt.accountVoucherDetails; // Replace with your actual data source
  
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
    });
  }

  getDocumentNumber(){
    this.sub$.sink = this.documentService.getNextDocumentNo(DocumentTypeEnum.RECEIPTVOUCH).subscribe((res:IDocument)=>{
      this.receiptVoucherForm.patchValue({docNo:res.consolidatedDocumentNo})
    })
  }
}
