import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../../device.service';
import { CustomValidators } from '@shared/validators/password-mismatch-validation';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-manage-device-user',
  templateUrl: './manage-device-user.component.html',
  styleUrls: ['./manage-device-user.component.scss']
})
export class ManageDeviceUserComponent extends BaseComponent implements OnInit {
  imgURL:any = null
  deviceUserForm:FormGroup
  deviceUserDetails:DeviceUser
  isImageUpdate: boolean = false;
  isUpdate: boolean = false;
  isDefaultBranch: boolean = true;
  routeId:string=''
  loading$:Observable<boolean> = of(false)
  constructor(
    private location:Location,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private deviceService:DeviceService,
    private toastr:ToastrService,
    public translate:TranslationService
  ) { super() }

  ngOnInit(): void {
    const deviceUUID = this.route.snapshot.queryParams['id'];
    this.createDeviceUserForm(deviceUUID)
    this.getDeviceUserDetail()
  }


  getDeviceUserDetail():void{
    this.sub$.sink = this.route.data.subscribe(
      (data: { deviceUser: DeviceUser }) => {
        if (data.deviceUser) {
          this.deviceUserDetails = { ...data.deviceUser };
          this.patchDeviceUserForm();
          this.isUpdate=true
          this.isDefaultBranch = false
          const {userName,loginPin}=this.deviceUserForm.controls
          userName.disable()
          loginPin.clearValidators(); // Remove validation
          loginPin.updateValueAndValidity();
          if (this.deviceUserDetails.profilePhoto) {
            this.imgURL = environment.apiUrl+ this.deviceUserDetails.profilePhoto;
          }
        } 
      }
    );

    this.routeId=this.deviceUserForm.get('deviceUUID').value
  }
  patchDeviceUserForm() {
    this.deviceUserForm.patchValue(this.deviceUserDetails)
    this.imgURL = this.deviceUserDetails.profilePhoto
  }

  createDeviceUserForm(deviceUuid:string):void {
    this.deviceUserForm = this.fb.group({
      id: [''],
      branchUUID: [''],
      deviceUUID: [deviceUuid],
      userName: ['',[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      profilePhoto: [''],
      loginPin: ['', [Validators.required]],
      confirmLoginPin: [''],
    },{validators:CustomValidators.PasswordMatchValidator
    });
  }

  cancelClicked() {
    this.location.back();
  }
  
  onFileSelect(event: any) {
    const fileSelected = event.target.files[0];
    if (!fileSelected || !fileSelected.type.match(/^image\//)) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result as string;
      this.isImageUpdate = true;
    };
    reader.readAsDataURL(fileSelected);
  }
  
  

  removeImage() {
    this.isImageUpdate = true
    this.imgURL = '';
  }

  save(){
    if(this.deviceUserForm.invalid){
      this.deviceUserForm.markAllAsTouched();
      return;
    }
    this.loading$ = of(true)

    const userDetails:DeviceUser = this.deviceUserForm.getRawValue()
    if(this.isImageUpdate)
    userDetails.profilePhoto = this.imgURL || ''

    if(this.isUpdate){
      this.deviceService.UpdateDeviceUser(userDetails).subscribe((res)=>{
        this.toastr.success(this.translate.getValue('RESPONSE_MESSAGE.USER_UPDATED_SUCCESSFULLY'))
        this.cancelClicked()
        this.loading$ = of(false)

      },
      ()=>{
        this.loading$ = of(false)
      })
    }
    else{
      this.deviceService.AddDeviceUser(userDetails).subscribe((res)=>{
        this.toastr.success(this.translate.getValue('RESPONSE_MESSAGE.USER_CREATED_SUCCESSFULLY'))
        this.cancelClicked()
        this.loading$ = of(false)

      },
      ()=>{
        this.loading$ = of(false)
      })
    }
  }

  isInputHidden() {
    return this.isUpdate;
  }
  
}
