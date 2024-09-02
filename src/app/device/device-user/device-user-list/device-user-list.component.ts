import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Device, IDevice } from '@core/domain-classes/device';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { DeviceActivationStatus } from '@core/domain-classes/enums/device-activation-status';
import { MerchantAccountModal } from '@core/domain-classes/merchant-account-modal.interface';
import { MerchantModalForm } from '@core/domain-classes/merchant-modal-form.interface';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { PosDeviceService } from 'src/app/accounts/pos-device/pos-device.service';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../../device.service';
import { ResetPinComponent } from '../reset-pin/reset-pin.component';
import { DeviceUserDataSource } from './device-user.datasource';
import { Observable, forkJoin, of } from 'rxjs';
import { PosPrinterService } from 'src/app/accounts/pos-printer/pos-printer.service';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { MerchantAccountModalComponent } from '@shared/components/merchant-account-modal/merchant-account-modal.component';
import { PosMerchantAccountDevicesComponent } from '@shared/components/pos-merchant-account-devices/pos-merchant-account-devices.component';
import { PosPrinterDetailDialogComponent } from '@shared/components/pos-printer-detail-dialog/pos-printer-detail-dialog.component';
import {v4 as uuid} from 'uuid';
import { DevicePOSPrinter } from '@core/domain-classes/device-pos-printer.interface';
import { DevicePOSDevice } from '@core/domain-classes/device-pos-device.interface';

@Component({
  selector: 'app-device-user-list',
  templateUrl: './device-user-list.component.html',
  styleUrls: ['./device-user-list.component.scss']
})
export class DeviceUserListComponent extends BaseComponent  implements OnInit {

  dataSource:DeviceUserDataSource
  deviceDetail: Device;
  deviceActivationStatus = DeviceActivationStatus
  displayedColumns = ['action','userName','firstName','lastName'];
  posDevices: POSDevice[] = [];
  posPrinter: POSPrinter[] = [];
  posMerchantDevices: DevicePOSDevice[] = [];
  isSavePosDevice$: Observable<boolean> =of(false);
  isSavePosPrinter$: Observable<boolean> =of(false);
  posMerchantPrinters: DevicePOSPrinter[] = [];
  constructor(
    public translationService: TranslationService,
    private routes: ActivatedRoute,
    private commonDialogService:CommonDialogService,
    private deviceService:DeviceService,
    private toastrService:ToastrService,
    private dialog:MatDialog,
    private posDeviceService:PosDeviceService,
    private posPrinterService:PosPrinterService
    
  ) { super() }

  ngOnInit(): void {
    this.loadModalData()
    this.getDeviceUserList()
    this.getDeviceDetails()
  }

  getDeviceDetails(){
    this.sub$.sink = this.routes.data.subscribe((data:{device:IDevice})=>{
      if(!data.device )return;
      this.deviceDetail = new Device(data.device)
      this.loadData(this.deviceDetail.deviceUUID);
    })
  }

  getDeviceUserList(){
    const id = this.routes.snapshot.paramMap.get('id');
    this.dataSource = new DeviceUserDataSource(this.deviceService)
    this.dataSource.loadData(id)
  }


  deleteUser(user:DeviceUser) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${user.userName}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.deviceService.DeleteDeviceUser(user.id)
            .subscribe(() => {
              this.getDeviceUserList()
              this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_DELETED_SUCCESSFULLY'));
            });
        }
      });
  }


  resetPin(userId:string): void {
    this.dialog.open(ResetPinComponent, {
      width: '350px',
      data:userId
    }).afterClosed().subscribe((res:boolean)=>{
      if(!res)return;
      this.getDeviceUserList()
    })

  }


  openDeviceMapDialog():void {
    const dialogData:MerchantAccountModal={
      banks:[],
      isDevice:true,
      isBank:false,
      posDevices:this.posDevices,
      isDeviceMultiple:true,
      isBankMultiple:false,
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

       const posDeviceList: POSDevice[] = result?.posDevices as POSDevice[];
       this.posMerchantDevices.push(
         ...posDeviceList.map((posDevice: POSDevice) => {
           const devicePOSDevice: DevicePOSDevice = {
             devicePOSPaymentDeviceUUID: uuid(),
             posDeviceUUID: posDevice.posDeviceUUID,
             deviceUUID:   this.deviceDetail.deviceUUID,
             isDefaultPOSDevice:  false,
             posDevice:   posDevice
           };
           return devicePOSDevice;
         })
       );
       this.isSavePosDevice$ = of(true)
    });

  }
  openPOSPrinterMapDialog():void {
    const dialogData:MerchantAccountModal={
      banks:[],
      isDevice:false,
      isBank:false,
      posDevices:[],
      isDeviceMultiple:false,
      isBankMultiple:false,
      isPosPrinter:true,
      isPosPrinterMultiple:true,
      posPrinters:this.posPrinter
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
      const posPrinterList: POSPrinter[] = result?.posPrinters as POSPrinter[];
      this.posMerchantPrinters.push(
        ...posPrinterList.map((posPrinter: POSPrinter) => {
          const devicePOSPrinter: DevicePOSPrinter = {
            devicePOSPrinterUUID: uuid(),
            deviceUUID: this.deviceDetail.deviceUUID,
            posPrinter: posPrinter,
            posPrinterUUID: posPrinter.posPrinterUUID ,
            isDefaultPrinter:false
          };
          return devicePOSPrinter;
        })
      );
       this.isSavePosPrinter$ = of(true)
    });

  }
  
  openDetailDialog(componentName:string,uuid:string):void {
    let dialogComponent:any;
    switch (componentName) {
      case 'merchantPOSPrinter':
        dialogComponent = PosPrinterDetailDialogComponent;
        break;
    
      case 'merchantPOSDevice':
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


  deletePosDevice(posDeviceUUID: string): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe((isTrue: boolean) => {
        if (!isTrue) return;
        this.posMerchantDevices = this.posMerchantDevices.filter(x => x.posDeviceUUID !== posDeviceUUID);
      this.isSavePosDevice$ = of(true)

      });
  }


  savePOSDevice():void{    
    this.sub$.sink = this.deviceService.updateDevicePOSPaymentDevices(this.deviceDetail.deviceUUID,this.posMerchantDevices).subscribe((res)=>{
      this.toastrService.success('POS Devices Are Sucessfully Updated To The Selected Device')
      this.isSavePosDevice$ = of(false)
    },
    ()=>{
      this.toastrService.error('POS Devices Are Failed To Update')
    })
  }
  setDefaultPOSDevice(posDevice: DevicePOSDevice) {
    this.posMerchantDevices.forEach(item => {
      if (item !== posDevice) {
        item.isDefaultPOSDevice = false;
      }
      else{
        item.isDefaultPOSDevice = true
      }
    });
  }

  deletePosPrinter(posPrinterUUID: string): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe((isTrue: boolean) => {
        if (!isTrue) return;
        this.posMerchantPrinters = this.posMerchantPrinters.filter(x => x.posPrinterUUID !== posPrinterUUID);
      this.isSavePosPrinter$ = of(true)
      });
  }


  savePOSPrinter():void{
  
    this.sub$.sink = this.deviceService.updateDevicePOSPrinter(this.deviceDetail.deviceUUID,this.posMerchantPrinters).subscribe((res)=>{
      this.toastrService.success('POS Printers Are Sucessfully Updated To The Selected Device')
      this.isSavePosPrinter$ = of(false)
    },
    ()=>{
      this.toastrService.error('POS Printers Are Failed To Update')
    })
  }
  setDefaultPOSPrinter(devicePosPrinter: DevicePOSPrinter) {
    this.posMerchantPrinters.forEach(item => {
      if (item !== devicePosPrinter) {
        item.isDefaultPrinter = false;
      }
      else{
        item.isDefaultPrinter = true
      }
    });
  }

  loadModalData():void{
    forkJoin([
      this.posPrinterService.getActivePOSPrinter(),
      this.posDeviceService.getActivePOSDevice(),
    ]).subscribe(([posPrinter, posDevices]) => {
      this.posPrinter = posPrinter as POSPrinter[];
      this.posDevices = posDevices as POSDevice[];
    });
  }



  loadData(deviceUUID: string): void {
    forkJoin({
      printers: this.deviceService.getDevicePOSPrinter(deviceUUID),
      devices: this.deviceService.getDevicePOSDevice(deviceUUID),
    })
      .subscribe((res: { printers: DevicePOSPrinter[], devices: DevicePOSDevice[] }) => {
        this.posMerchantPrinters = res.printers.map((item: DevicePOSPrinter) => {
          item.posPrinterUUID = item.posPrinter.posPrinterUUID;
          return item;
        });
  
        this.posMerchantDevices = res.devices.map((item: DevicePOSDevice) => {
          item.posDeviceUUID = item.posDevice.posDeviceUUID;
          return item;
        });
      });
  }
}
