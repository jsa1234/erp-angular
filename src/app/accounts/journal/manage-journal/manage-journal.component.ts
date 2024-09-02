import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentTypeEnum } from '@core/domain-classes/enums/document-type.enum';
import { IJournal } from '@core/domain-classes/journal';
import { User } from '@core/domain-classes/user';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from 'src/app/document/document.service';
import { v4 as uuid } from 'uuid';
import { AccountHeadService } from '../../accounts/account-head.service';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-manage-journal',
  templateUrl: './manage-journal.component.html',
  styleUrls: ['./manage-journal.component.scss']
})
export class ManageJournalComponent extends BaseComponent implements OnInit,OnDestroy {
journalForm:FormGroup
deviceUUID = this.securityService.getUserDetail().deviceUUID
  isUpdate: boolean = false;
  accountHeadList: AccountHeadTree[] = [];
  crAccountHeadList: AccountHeadTree[] = [];
  drAccountHeadList: AccountHeadTree[] = [];
  isDefaultBranch:boolean = true;
  destroy$: Subject<void> = new Subject<void>();
  users: User[] = [];
  isLoading$:Observable<boolean> = of(false)
  selectedUser: string;
  crSearchControl: FormControl = new FormControl('');
  drSearchControl: FormControl = new FormControl('');

  constructor(public translate: TranslationService,
    private fb: FormBuilder,
    private accountheadService: AccountHeadService,
    private voucherService: JournalService,
    private toastr: ToastrService,
    private router: Router,
    private securityService: SecurityService,
    private documentService:DocumentService,
    private route:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getJournal()
    this.loadData()

    
    this.crSearchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.crAccountHeadList = this.filterAccountHead(searchTerm);
    });
    this.drSearchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.drAccountHeadList = this.filterAccountHead(searchTerm);
    });
  }


  filterAccountHead(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.accountHeadList;
    } else {
      // Filter by brand name containing the search term
      return this.accountHeadList.filter((accountHead) =>
        accountHead.nameEnglish.toLowerCase().includes(searchTerm) ||
        accountHead.accountCode.toLowerCase().includes(searchTerm) 
      );
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  createForm():void{
    this.journalForm = this.fb.group({
      journalUUID:[uuid()],
      docNo: [{value:'',disabled:true}],
      docDate:[''],
      description:[''],
      deviceUUID:[this.deviceUUID],
      branchUUID:[''],
      totalCrAmount:[''],
      totalDrAmount:[''],
      createdBy:[''],
      journalDetails:this.fb.array([this.createRow()])
    })

    this.tableRows.valueChanges.pipe(
      distinctUntilChanged(), // Ensure that only distinct changes trigger the subscription
      takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
    )
    .subscribe(() => {
      this.journalForm.patchValue({
        totalCrAmount:this.calculateTotal(),
        totalDrAmount:this.calculateTotal()
      })
    });


 this.journalForm.get('branchUUID').valueChanges
      .pipe(
        distinctUntilChanged(), // Ensure that only distinct changes trigger the subscription
        filter(branchUUID => !!branchUUID), // Skip null or undefined values
        takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
      )
      .subscribe((res) => {
        this.tableRows.controls.forEach((row) => {
          (row as FormGroup).get('branchUUID').setValue(res, { emitEvent: false });
        });
      });
  }


  createRow() {
    return this.fb.group({
      journalDetailUUID: new FormControl(uuid()),
      drAccountUUID: new FormControl('',Validators.required),
      crAccountUUID: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      description: new FormControl(''),
      deviceUUID:new FormControl(this.deviceUUID),
      branchUUID:new FormControl('')
    });
  }

   get tableRows() {
    return this.journalForm.get('journalDetails') as FormArray;
  }
  addRow() {
    const newRow = this.createRow();
    this.tableRows.push(newRow);
    newRow.get('branchUUID').setValue( this.journalForm.get('branchUUID').value);
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



  saveJournal() {
    if (this.journalForm.invalid) {
      this.journalForm.markAllAsTouched();
      return;
    }

    this.isLoading$ = of(true)
    const formData: IJournal = this.journalForm.getRawValue();
    this.isUpdate ? this.updateJournal(formData) : this.createJournal(formData);
  }

  createJournal(journalData: IJournal) {
    // journalData.createdBy = this.selectedUser
    // journalData.createdUser =JSON.parse( this.selectedUser)
    this.voucherService.createJournal(journalData).subscribe(() => {
      this.toastr.success('Journal Created Successfully');
      this.router.navigate(['/journal']);
    });
  }
  updateJournal(journalData: IJournal) {
    this.voucherService.updateJournal(journalData).subscribe(() => {
      this.toastr.success('Journal Created Successfully');
      this.router.navigate(['/journal']);
    });
  }
  
  getJournal(): void {
    this.route.data.subscribe((data: { journal: IJournal }) => {
      this.createForm();
      if (!data.journal) {
        this.isUpdate = false;
        this.isDefaultBranch= true
        return;
      }
  
      this.isUpdate = true;
      this.isDefaultBranch= false
      this.journalForm.patchValue(data.journal);
      const dynamicArrayData = data.journal.journalDetails; 
      while (this.tableRows.length) {
        this.tableRows.removeAt(0);
      }
      dynamicArrayData.forEach((item) => {
        this.addRow();
        const rowIndex = this.tableRows.length - 1; 
        this.tableRows.at(rowIndex).patchValue(item);
      });
    });
  }


  loadData(): void {
    this.isLoading$ = of(true)
    forkJoin([
      this.documentService.getNextDocumentNo(DocumentTypeEnum.JOURNAL),
      this.accountheadService.getAllLevelThreeAccountHeads()
    ]).subscribe(([document,acccountHeadList]) => {
      this.accountHeadList = [...acccountHeadList as AccountHeadTree[]];
      this.crAccountHeadList = this.filterAccountHead('');
      this.drAccountHeadList = this.filterAccountHead('');
      !this.isUpdate?this.journalForm.patchValue({docNo:(document as IDocument).consolidatedDocumentNo}):''
      this.isLoading$ = of(false)

    },
    ()=>{
    this.isLoading$ = of(false)
    });
  }
  
// onSelectedUser(user:User){
//   this.selectedUser = JSON.stringify(user)
// }
}