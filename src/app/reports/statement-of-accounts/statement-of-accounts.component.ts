
import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LedgerReportDataList } from '@core/domain-classes/report-classes/ledger-report-detail-list';
import { LedgerResourceParameter } from '@core/domain-classes/report-classes/statement-of-account-resource-parameter';
import { StatementOfAccount } from '@core/domain-classes/report-classes/statment-of-accounts';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { StatementOfAccountsService } from './statement-of-accounts.service';
import * as XLSX from 'xlsx';
import { IAccountHead } from '@core/domain-classes/account-head';
import { DeviceService } from 'src/app/device/device.service';
import { IDevice } from '@core/domain-classes/device';
import { environment } from '@environments/environment';
import { ShowCrDrPipe } from '@shared/pipes/show-cr-dr.pipe';

@Component({
  selector: 'app-statement-of-accounts',
  templateUrl: './statement-of-accounts.component.html',
  styleUrls: ['./statement-of-accounts.component.scss'],
})
export class StatementOfAccountsComponent  extends BaseComponent implements OnInit {

  searchForm:FormGroup
  ledgerReportResource:LedgerResourceParameter
  ledgerReport:StatementOfAccount
  ledgerReportPdf:StatementOfAccount
  ledgerReportList:LedgerReportDataList[] =[]
  ledgerList:IAccountHead[] =[]
  accountGroupList:IAccountHead[] =[]
  subledgerList:IAccountHead[] =[]
  accountHeadList:IAccountHead[] =[]
  branchUUID: any;

  constructor(private fb:FormBuilder,
    private statementOfAccountsService:StatementOfAccountsService,
    public translationService:TranslationService,
    private clonerService: ClonerService,
    private deviceService:DeviceService
    ) {
      super()
      this.ledgerReportResource = new LedgerResourceParameter()
  }


  ngOnInit(): void {
    this.createSearchForm()
    this.getAllAccountGroup()
    this.getDevices()
  }

  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:[''],
      device:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      accountgroup:[''],
      ledger:[''],
      subLedger:[''],
      account:['',Validators.required]
    })
  }


  getAllAccountGroup(){
    this.sub$.sink = this.statementOfAccountsService.getAccountGroups().subscribe((res:IAccountHead[])=>{
      this.accountGroupList = res
    })
    this.subledgerList=[]
    this.accountHeadList =[]
  }

getAllLedger(value:string){
  this.sub$.sink = this.statementOfAccountsService.getLedger(value).subscribe((res:IAccountHead[])=>{
    this.ledgerList = res
  })
  this.subledgerList=[]
  this.accountHeadList =[]
}
getAllSubLedger(value:string){
  this.sub$.sink = this.statementOfAccountsService.getSubLedger(value).subscribe((res:IAccountHead[])=>{
    this.subledgerList = res
  })
this.accountHeadList =[]
}
getAllAccountHead(value:string){
  this.sub$.sink = this.statementOfAccountsService.getAccountHead(value).subscribe((res:IAccountHead[])=>{
    this.accountHeadList = res
  })
}
  onSearch(){

    if( this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
     this.ledgerReportResource= this.searchForm.getRawValue()      
     this.sub$.sink = this.statementOfAccountsService.getLedgerReport( this.ledgerReportResource).subscribe((res:StatementOfAccount)=>{
      this.ledgerReport = res
      this.ledgerReportList = this.ledgerReport.ledgerReportDataList
     })
   }

  onClear(){
    this.resetForm();
    this.ledgerReportResource= this.searchForm.getRawValue()
    this.ledgerReportList=[]
    this.ledgerReport = null
    this.subledgerList=[]
    this.accountHeadList =[]
    this.ledgerList = []
  }

  resetForm(){
    this.searchForm.patchValue({
      device:'',
      fromDate:'',
      toDate:'',
      account:'',
      accountgroup:'',
      ledger:'',
      subLedger:'',
    })
    this.searchForm.markAsUntouched()
  }
  onDownloadReport(){
    let ledgerReportListPdf = this.ledgerReport.ledgerReportDataList
    let ledgerReportPdf = this.ledgerReport
    let ledgerNormalReport = []
    let heading=[[
    'DATE','PARTICULARS','INVOICE NO','DEBITS','CREDITS','BALANCE'
  ]];
  const showDrCr = new ShowCrDrPipe()
  ledgerReportListPdf.forEach((res: LedgerReportDataList)=>{
    const balanceDebitCredit =res?.balanceDebitCredit? this.translationService.getValue(res?.balanceDebitCredit):''
    ledgerNormalReport.push({
        'DATE':   res?.accountTransactionDate,
        'PARTICULARS': res?.particulars,
        'INVOICE NO': res?.transactionDocumentNo,
        'DEBITS':  res?.debits >=0 && res?.credits == 0?res?.debits :'',
        'CREDITS': res?.credits >0?res?.credits:'',
        'BALANCE': showDrCr.transform(res?.balance,balanceDebitCredit) ,
      });
  });

  ledgerNormalReport.push({
    'DATE':'',
    'PARTICULARS':'',
    'INVOICE NO':'',
    'DEBITS':'',
    'CREDITS':'',
    'BALANCE':'',
  });

  ledgerNormalReport.push({
    'DATE':'TOTAL',
    'PARTICULARS':'',
    'INVOICE NO':'المجموع',
    'DEBITS':ledgerReportPdf?.totalDebits,
    'CREDITS':ledgerReportPdf?.totalCredits,
    'BALANCE':'',
  });


      let workBook= XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook,heading);
      let workSheet= XLSX.utils.sheet_add_json(workBook, ledgerNormalReport, {origin: "A2", skipHeader:true });
      XLSX.utils.book_append_sheet(workBook,workSheet,"Statement Of Account Report");
      XLSX.writeFile(workBook, "Statement of Account Report.xlsx");

  }

  generatePdf(){
    this.ledgerReportPdf = this.clonerService.deepClone<StatementOfAccount>(this.ledgerReport)
  }


  getDevices(){
    this.sub$.sink = this.deviceService.GetDevices().subscribe((res:IDevice[])=>{
      this.deviceService.SetDevices(res)
    })
  }
  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
  }
}

