import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { AccountHead } from '@core/domain-classes/account-head';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { AccountHeadService } from '../account-head.service';

import { v4 as Guid } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { EnableOrDisableFormControl } from '@shared/helpers/form-enable-disable';

interface ExampleFlatNode {
  expandable: boolean;
  nameEnglish: string;
  nameSecondLanguage: string;
  level: number;
  accoundHead: AccountHead;
}

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [],
})
export class AccountDetailComponent extends BaseComponent implements OnInit {
  AccountHeadForm: FormGroup;
  accountHeadTree: AccountHeadTree[];
  isUpdate: boolean = false;
  formTitle: string = '';
  name: string;
  operation: string;
  symbol = '  -  ';
  submitted: boolean;
  isLoading: boolean = false;
  getAccountHeadTree() {
    this.isLoading=true
    this.sub$.sink = this.accountHeadService
      .getAccountHeadTree()
      .subscribe((resp: AccountHeadTree[]) => {
        this.isLoading=false
        this.accountHeadTree = resp;
        this.dataSource.data = this.accountHeadTree ? this.accountHeadTree : [];
      });
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    let uuid = Guid();
    this.AccountHeadForm = this.fb.group({
      accountUUID: [uuid],
      nameEnglish: [{ value: '', disabled: true },[Validators.required]],
      nameSecondLanguage: [{ value: '', disabled: true }],
      accountCode: [{ value: '', disabled: true },[Validators.required]],
      // openingBalance: [{ value: '', disabled: true }],
      accParentUUID: [''],
      // debitCredit: [{ value: 0, disabled: true }],
      accParentId: [0],
    });
    this.submitted =true
  }
  onAccounFormSubmit() {
    if (this.AccountHeadForm.invalid) {
      this.AccountHeadForm.markAllAsTouched();
      return;
    }
      const formData: AccountHead = this.AccountHeadForm.value;
      if (this.isUpdate) {
        this.accountHeadService
          .updateAccountHeadTree(formData.accountUUID, formData)
          .subscribe((res) => {
            this.AccountHeadForm.reset();
            this.getAccountHeadTree();
            this.toastrService.success('Account Head updated Successfully');
            this.disableForm();
            this.formTitle = '';
          });
      } else {
        formData.accountUUID = formData.accountUUID
          ? formData.accountUUID
          : Guid();
        this.accountHeadService
          .createAccountHeadTree(formData)
          .subscribe((res: AccountHead) => {
            this.AccountHeadForm.reset();
            this.getAccountHeadTree();
            this.toastrService.success('Account Head Created Successfully');
            this.disableForm();
            this.formTitle = '';
          });
      }
    
  }

  addNewItem(node: AccountHead) {
    this.submitted = false
    this.enableForm();
    this.isUpdate = false;
    let a: any = node;
    this.operation = 'COMMON.CREATE';
    this.formTitle = 'ACCOUNTS.ACCOUNT_HEAD.ACCOUNT_HEAD_UNDER';
    this.name = a.accoundHead.nameEnglish;
    let uuid = a.accoundHead.accountUUID;
    this.AccountHeadForm.patchValue({
      accParentUUID: uuid,
      nameEnglish: '',
      nameSecondLanguage: '',
      accountCode: '',
      // openingBalance: '',
      // debitCredit: '',
      accParentId: 0,
    });
  }
  editItem(node: AccountHead) {
     this.submitted = false
    this.enableForm();
    this.isUpdate = true;
    let a: any = node;
    this.operation = 'COMMON.UPDATE';
    this.formTitle = 'ACCOUNTS.ACCOUNT_HEAD.ACCOUNT_HEAD_LABEL';
    this.name = a.accoundHead.nameEnglish;
    this.AccountHeadForm.patchValue({
      accParentUUID: a.accoundHead.accParentUUID,
      accountUUID: a.accoundHead.accountUUID,
      nameEnglish: a.accoundHead.nameEnglish,
      nameSecondLanguage: a.accoundHead.nameSecondLanguage,
      accountCode: a.accoundHead.accountCode,
      // openingBalance: a.accoundHead.openingBalance,
      // debitCredit: a.accoundHead.debitCredit.toString(),
      // accParentId: [0],
    });
  }
  deleteItem(node: AccountHead) {
    this.submitted = true
    this.AccountHeadForm.patchValue({
      accParentUUID: '',
      nameEnglish: '',
      nameSecondLanguage: '',
      accountCode: '',
      // openingBalance: '',
      // debitCredit: '',
      accParentId: 0,
    });
    this.operation = '';
    this.formTitle = '';
    this.name ='';
    this.disableForm()
    let a: any = node;
    let accountUUID = a.accoundHead.accountUUID;
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${a.accoundHead.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.accountHeadService
            .deleteAccountHeadTree(accountUUID)
            .subscribe((res) => {
              this.getAccountHeadTree();
              this.toastrService.success('Account Head deleted successfully');
            });
        }
      });
  }

  enableForm() {
    const controlNames = ['nameEnglish',  'accountCode', 'nameSecondLanguage'];
    EnableOrDisableFormControl(controlNames,this.AccountHeadForm,true)
  }
  
  disableForm() {
    const controlNames = ['nameEnglish',  'accountCode', 'nameSecondLanguage'];
    EnableOrDisableFormControl(controlNames,this.AccountHeadForm,false)
  }
  
  onCancel() {
    this.route.navigate(['accountHead']);
  }

  private _transformer = (node: AccountHeadTree, level: number) => {
    return {
      expandable: !!node.accountChildren && node.accountChildren.length > 0,
      nameEnglish: node.nameEnglish,
      nameSecondLanguage: node.nameSecondLanguage,
      level: level,
      accoundHead: new AccountHead(
        node.accountUUID,
        node.accountCode,
        node.accountType,
        node.nameEnglish,
        node.nameSecondLanguage,
        node.accLevel,
        node.accParentUUID,
        node.openingBalance,
        node.debitCredit
      ),
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.accountChildren
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private accountHeadService: AccountHeadService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private route: Router,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService
  ) {
    super();
    this.getAccountHeadTree();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
