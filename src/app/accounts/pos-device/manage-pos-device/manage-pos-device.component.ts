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
  deviceUUID:string = '';
  branchUUID:string = '';
  counterUUID:string='';
  isUpdate: boolean = false;
  isLoading$:Observable<boolean> = of(false)
  name:string = '';
  isDefaultBranch:boolean = true;
  counterForm: FormGroup;
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
  createForm():void{
    this.counterForm = this.fb.group({

      branchUUID:[''],
      name:[''],
      mac:['']
    })
  }
 
  
  saveCounter(){
    if(this.counterForm.valid){
      this.loader.show();
      const counterDevice={
        name: this.counterForm.get('name')?.value,
        branchUUID: this.counterForm.get('branchUUID')?.value,
        macaddress:this.counterForm.get('mac')?.value
        //branchUUID:[''],
      }
      const updateCounterDevice={
        name: this.counterForm.get('name')?.value,
        branchUUID: this.counterForm.get('branchUUID')?.value,
        counterUUID: this.counterUUID,
        macaddress:this.counterForm.get('mac')?.value
      }
      this.isUpdate?this.updateCounter(updateCounterDevice):this.createCounter(counterDevice)
    }
    
  }

  createCounter(counterSave:any):void{
    this.sub$.sink = this.posDeviceService.createPosDevice(counterSave).subscribe(()=>{
      this.toastr.success('Counter Created Successfully');
      this.router.navigate(['/pos-device']);
      this.loader.hide();

    },
    ()=>{
      this.toastr.error('Counter Creation Failed');
    this.loader.hide();
      
    })
  }
  updateCounter(counterUpdate:any):void{
    this.sub$.sink = this.posDeviceService.updatePosDevice(counterUpdate).subscribe(()=>{
      this.toastr.success('Counter Updated Successfully');
      this.router.navigate(['/pos-device']);
      this.loader.hide();

    },
    ()=>{
      this.toastr.error('POS Device Updated Failed');
    this.loader.hide();
      
    })
  }
 


  getPOSDeviceDetails(): void {
    this.route.data.subscribe((data: { posDevice: any }) => {
      this.createForm();
      if (!data.posDevice) {
        this.isUpdate = false;
        this.isDefaultBranch= true
        return;
      }
      this.isUpdate = true;
      this.isDefaultBranch= false
      
      this.name = data.posDevice.data.name;
      this.counterUUID=data.posDevice.data.counterUUID;
      this.branchUUID =data.posDevice.data.branchUUID;
      const mac = data.posDevice.data.macAddress;
      this.counterForm.patchValue({
        name:this.name,
        branchUUID:this.branchUUID,
        mac:mac
      })
     // form.patchValue(posDevice);
    });
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = of(isLoading));
  }
}
