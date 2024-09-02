import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { v4 as uuid } from 'uuid';
import { PaymentMerchantService } from '../payment-merchant.service';
import { Bank } from '@core/domain-classes/bank.interface';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { PosDeviceService } from '../../pos-device/pos-device.service';
import { BankService } from '../../bank/bank.service';
import { forkJoin } from 'rxjs';
import { MerchantAccountModal } from '@core/domain-classes/merchant-account-modal.interface';
import { MerchantModalForm } from '@core/domain-classes/merchant-modal-form.interface';
import { MapperService } from '@shared/services/mapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { POSMerchantAccount } from '@core/domain-classes/pos-merchant-account.interface';
import { environment } from '@environments/environment';
import { PosMerchantAccountBanksComponent } from '../../../shared/components/pos-merchant-account-banks/pos-merchant-account-banks.component';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { MerchantAccountModalComponent } from '@shared/components/merchant-account-modal/merchant-account-modal.component';
import { PosMerchantAccountDevicesComponent } from '@shared/components/pos-merchant-account-devices/pos-merchant-account-devices.component';


@Component({
  selector: 'app-manage-payment-merchant',
  templateUrl: './manage-payment-merchant.component.html',
  styleUrls: ['./manage-payment-merchant.component.scss']
})
export class ManagePaymentMerchantComponent extends BaseComponent implements OnInit {
  merchantAccountForm:FormGroup
  merchantAccountTypes: string[];
  banks: Bank[]=[];
  posMerchantbanks: Bank[]=[];
  posMerchantDevices: POSDevice[] = [];
  posDevices: POSDevice[] ;
  isImageUpdate: boolean = false;
  isUpdate: boolean = false;
  imgSrc:string | ArrayBuffer = null;
  constructor(
    private fb:FormBuilder,
    private dialog:MatDialog,
    private merchantAccountService:PaymentMerchantService,
    private toastr:ToastrService,
    private posDeviceService:PosDeviceService,
    private bankService:BankService,
    private mapperService:MapperService,
    private router:Router,
    private route:ActivatedRoute,
    private commonDialogService:CommonDialogService,
    private translationService:TranslationService) {
    super();
  }


  ngOnInit(): void {
    this.loadModalData();
    this.getAllPaymentMerchantType()
    this.getMerchantAccountDetails()
  }

  createForm():void{
    this.merchantAccountForm = this.fb.group({
      posMerchantUUID:[uuid()],
      nameEnglish:    [''],
      posMerchantType:[''],
      merchantIdentificationnumber:[''],
      terminalIdentificationNumber:[''],
      portalUrl:      [''],
      portalUsername: [''],
      portalPassword: [''],
      deviceCount:    [''],
      contactPersonName: [''],
      contactPersonPhone:[''],
      contactPersonEmail:[''],
      supportEmail:   [''],
      supportPhone:   [''],
      posMerchantImage:  [''],
      imagePath:      [''],
    })
  }

  onFileSelect($event:Event):void {
    const fileInput = $event.target as HTMLInputElement;
    const fileSelected = fileInput.files[0];
    if (!fileSelected) {
      return;
    }

    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.isImageUpdate = true;
      fileInput.value = null;
    };
  }

  onRemoveImage() {
    this.isImageUpdate = true;
    this.imgSrc = null;
  }

  openBankDialog():void {
    const dialogData:MerchantAccountModal={
      banks:this.banks,
      isDevice:false,
      isBank:true,
      posDevices:this.posDevices,
      isBankMultiple:true,
      isDeviceMultiple:false,
      isPosPrinterMultiple:false,
      isPosPrinter:false,
      posPrinters:[]
    }
    const dialogRef = this.dialog.open(MerchantAccountModalComponent,
      {
        width: '500px',
        height: '240px',
        disableClose:true,
        data:dialogData
      });

    dialogRef.afterClosed().subscribe((result:MerchantModalForm) => {
      if(!result)return;
      this.posMerchantbanks = [...this.posMerchantbanks,...result.banks as Bank[]]
      this.posMerchantbanks[0].isDefaultBank = true
    });
  }

  openDeviceMapDialog():void {
    const dialogData:MerchantAccountModal={
      banks:this.posMerchantbanks,
      isDevice:true,
      isBank:true,
      posDevices:this.posDevices,
      isBankMultiple:false,
      isDeviceMultiple:false,
      isPosPrinterMultiple:false,
      isPosPrinter:false,
      posPrinters:[]
    }
    const dialogRef = this.dialog.open(MerchantAccountModalComponent,
      {
        width: '500px',
        height: '300px',
        disableClose:true,
        data:dialogData
      });

    dialogRef.afterClosed().subscribe((result:MerchantModalForm) => {
      if(!result)return;
      const posDevice:POSDevice = result?.posDevices as POSDevice
      const bank:Bank = result.banks as Bank
      posDevice.posMerchantDeviceBanks = [bank]
      posDevice.bankName = bank.nameEnglish
      posDevice.bankUUID = bank.accountUUID
      this.posMerchantDevices.push(posDevice)
    });

  }
  getAllPaymentMerchantType():void{
    this.sub$.sink = this.merchantAccountService.getAllPaymentMerchantType().subscribe(
      (res:string[])=>{
        this.merchantAccountTypes = res;
      },
      ()=>{
        this.toastr.error('Failed to Fetch Payment Merchant Account Types')
      }
    )
  }



  loadModalData():void{
    forkJoin([
      this.bankService.getActiveBanks(),
      this.posDeviceService.getActivePOSDevice(),
    ]).subscribe(([banks, posDevices]) => {
      this.banks = banks as Bank[];
      this.posDevices = posDevices as POSDevice[];
    });
  }

  save():void{
    if(this.merchantAccountForm.invalid){
      this.merchantAccountForm.markAllAsTouched();
      return;
    }

    if(this.posMerchantbanks.length<=0){
      this.toastr.warning('Please Choose Bank');
      return;
    }

    if(this.posMerchantDevices.length<=0){
      this.toastr.warning('Please Choose Devices');
      return;
    }

    const merchantAccount:POSMerchantAccount = this.mapperService.mapPaymentMerchantAccount(this.merchantAccountForm.getRawValue(),this.posMerchantbanks,this.posMerchantDevices)
    if(this.isImageUpdate){
      merchantAccount.posMerchantImage = this.imgSrc || '';
      merchantAccount.isImageUpdate = true;
    }
    this.isUpdate?this.updateMerchantAccount(merchantAccount) : this.createMerchantAccount(merchantAccount)

  }


  createMerchantAccount(merchantAccount:POSMerchantAccount):void{
    this.merchantAccountService.createMerchantAccount(merchantAccount).subscribe((res)=>{
      this.toastr.success('Merchant Account Created Succesully');
      this.router.navigate(['payment-merchant'])

    },
    ()=>{
      this.toastr.error('Merchant Account Created Failed')
    })
  }
  updateMerchantAccount(merchantAccount:POSMerchantAccount):void{
    this.merchantAccountService.updateMerchantAccount(merchantAccount).subscribe((res)=>{
      this.toastr.success('Merchant Account Updated Succesully');
      this.router.navigate(['payment-merchant'])

    },
    ()=>{
      this.toastr.error('Merchant Account Updated Failed')
    })
  }



  setDefaultBank(bank: Bank) {
    this.posMerchantbanks.forEach(item => {
      if (item !== bank) {
        item.isDefaultBank = false;
      }
    });
  }

  getMerchantAccountDetails():void{
    this.route.data.subscribe((data: { posMerchantAccount: POSMerchantAccount }) => {
        this.createForm()
      if (!data.posMerchantAccount) {
        this.isUpdate = false
        return;
      }
      this.isUpdate = true
      const posMerchantAccount:POSMerchantAccount = data.posMerchantAccount
      this.merchantAccountForm.patchValue(posMerchantAccount)
      this.posMerchantDevices = [...posMerchantAccount.posMerchantDevices]
      this.posMerchantbanks = [...posMerchantAccount.posMerchantBanks]
      this.imgSrc = posMerchantAccount.imagePath?(environment.apiUrl+posMerchantAccount.imagePath) : null
    });
  }



  openDetailDialog(componentName:string,uuid:string):void {
    let dialogComponent:any;
    switch (componentName) {
      case 'merchantBank':
        dialogComponent = PosMerchantAccountBanksComponent;
        break;
    
      case 'merchantDevice':
        dialogComponent = PosMerchantAccountDevicesComponent;
        break;
    
      default:
        break;
    }
     this.dialog.open(dialogComponent,{
        width: '100%',
        data:uuid
      });
  }

deleteBank(bankId: string): void {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (!isTrue) return;
      const isBankInUse = this.posMerchantDevices?.some(x => x.bankUUID === bankId);
      if (isBankInUse) {
        this.toastr.error('Unable to Delete Bank: This bank is currently associated with one or more devices. Please unmap the devices before attempting to delete the bank.');
        return;
      }
      this.posMerchantbanks = this.posMerchantbanks.filter(x => x.accountUUID !== bankId);
      this.posMerchantbanks[0].isDefaultBank = true
      this.toastr.success('Bank Deleted Successfully')
    });
}


deletePosDevice(deviceId: string): void {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (!isTrue) return;

      this.posMerchantDevices = this.posMerchantDevices.filter(x => x.posDeviceUUID !== deviceId);
      this.toastr.success('POS Device Deleted Successfully')
    });
}

}
