import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { SecurityService } from '@core/security/security.service';
import { BaseComponent } from 'src/app/base.component';
import {v4 as uuid} from 'uuid';
import { PosDeviceService } from '../pos-device.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-manage-pos-device',
  templateUrl: './manage-pos-device.component.html',
  styleUrls: ['./manage-pos-device.component.scss'],
})
export class ManagePosDeviceComponent extends BaseComponent implements OnInit {
  posDeviceForm: FormGroup;
  deviceUUID:string = '';
  branchUUID:string = '';
  imgSrc:string | ArrayBuffer = null;
  isUpdate: boolean = false;
  isImageUpdate: boolean = false;
  isLoading$:Observable<boolean> = of(false)
  constructor(
    private fb: FormBuilder,
    private securityService:SecurityService, 
    private posDeviceService:PosDeviceService,
    private toastr:ToastrService,
    private router:Router,
    private loader:LoaderService,
    private route:ActivatedRoute) {
    super();
    this.branchUUID = this.securityService.getUserDetail().branchUUID
    this.deviceUUID = this.securityService.getUserDetail().deviceUUID
  }

  ngOnInit(): void {
    this.getPOSDeviceDetails()
    this.loaderShowOrHide()
  }

  createForm(): void {
    this.posDeviceForm = this.fb.group({
      posDeviceUUID: [uuid()],
      posDeviceCode: [''],
      nameEnglish: [''],
      deviceModel: [''],
      serialNo: [''],
      appKey: [''],
      username: [''],
      password: [''],
      haveRearCamera: [false],
      haveFrontCamera: [false],
      haveWifi: [false],
      haveSim: [false],
      havePrinter: [false],
      haveUsb: [false],
      printingPaperSize: [''],
      haveNfc: [false],
      haveMagneticCardReader: [false],
      haveBattery: [false],
      haveBluetooth: [false],
      haveUpiEnabled: [false],
      imeI1: [''],
      imeI2: [''],
      bluetoothMac: [''],
      wifiMac: [''],
      brandName: [''],
      branchUUID: [this.branchUUID],
      deviceUUID: [this.branchUUID],
      deviceImage: [''],
      imagePath: [''],
    });
  }

  savePosDevice(){
    if(this.posDeviceForm.invalid){
      this.posDeviceForm.markAllAsTouched();
      return;
    }
    this.loader.show();
    const posDeviceDetail:POSDevice = this.posDeviceForm.getRawValue()
    // posDeviceDetail.isImageUpdate = false;

    if(this.isImageUpdate){
      posDeviceDetail.deviceImage = this.imgSrc || '';
      posDeviceDetail.isImageUpdate = true;
    }
    this.isUpdate?this.updatePOSDevice(posDeviceDetail):this.createPOSDevice(posDeviceDetail)
  }

  createPOSDevice(posDevice:POSDevice):void{
    this.sub$.sink = this.posDeviceService.createPosDevice(posDevice).subscribe(()=>{
      this.toastr.success('POS Device Created Successfully');
      this.router.navigate(['/pos-device']);
      this.loader.hide();

    },
    ()=>{
      this.toastr.error('POS Device Created Failed');
    this.loader.hide();
      
    })
  }
  updatePOSDevice(posDevice:POSDevice):void{
    this.sub$.sink = this.posDeviceService.updatePosDevice(posDevice).subscribe(()=>{
      this.toastr.success('POS Device Updated Successfully');
      this.router.navigate(['/pos-device']);
      this.loader.hide();

    },
    ()=>{
      this.toastr.error('POS Device Updated Failed');
    this.loader.hide();
      
    })
  }
  onFileSelect($event:Event) {
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


  getPOSDeviceDetails(): void {
    this.route.data.subscribe((data: { posDevice: POSDevice }) => {
      this.createForm();
      if (!data.posDevice) {
        this.isUpdate = false;
        return;
      }
      this.isUpdate = true;
      const posDevice = data.posDevice
      this.posDeviceForm.patchValue(posDevice);
      this.imgSrc = posDevice.imagePath?(environment.apiUrl+posDevice.imagePath) : null
    });
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = of(isLoading));
  }
}
