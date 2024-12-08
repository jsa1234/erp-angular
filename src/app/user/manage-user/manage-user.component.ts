import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@core/domain-classes/role';
import { User } from '@core/domain-classes/user';
import { UserAllowedIP } from '@core/domain-classes/user-allowed-Ip';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from '../user.service';
import { ICompany } from '@core/domain-classes/company';
import { SecurityService } from '@core/security/security.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent extends BaseComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  roleList: Role[];
  isEditMode = false;
  //selectedRoles: Role[] = [];
  selectedRoles:any
  imgSrc: string | ArrayBuffer;
  isImageUpdate: boolean = false;
  companyId: string;
  selectedFile: File | null = null;
  isDefaultBranch:boolean = true;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private commonService: CommonService,
    private securityService: SecurityService,
    public translationService: TranslationService) {
    super();
  }
  ngOnInit(): void {
    this.securityService.companyProfile.subscribe((company: ICompany) => {
      this.companyId = company.companyUUID;
    });
    this.createUserForm();
    this.sub$.sink = this.activeRoute.data.subscribe(
      (data: { user: User }) => {
        if (data.user) {
          this.isEditMode = true;
          this.isDefaultBranch= false
          //this.userForm.patchValue(data.user);
          this.userForm.patchValue({
            ...data.user,
            branch: data.user.branchUUID
          });
          this.userForm.get('userAllowedIPs').patchValue(data.user.userAllowedIPs);
          this.user = data.user;
          if (this.user.profilePhoto) {
            this.imgSrc = environment.apiUrl + this.user.profilePhoto;
          }
        } else {
          this.isDefaultBranch= true
          this.userForm.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
          this.userForm.get('confirmPassword').setValidators([Validators.required]);
        }
      });
    this.getRoles();
  }
  createUserForm() {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: [''],
      confirmPassword: [''],
      address: [''],
      isActive: [true],
      userAllowedIPs: this.fb.array([this.newIP()]),
      branch:['',Validators.required],
      selectedRoles:['',[Validators.required]]
    }, {
      validator: this.checkPasswords
    });
  }
  get userAllowedIPs(): FormArray {
    return this.userForm.get("userAllowedIPs") as FormArray
  }
  newIP(): FormGroup {
    return this.fb.group({
      userId: [''],
      ipAddress: ['']
    })
  }
  addIP() {
    this.userAllowedIPs.push(this.newIP());
  }
  removeIP(i: number) {
    this.userAllowedIPs.removeAt(i);
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }
  // onFileSelect($event) {
  //   const fileSelected = $event.target.files[0];
  //   if (!fileSelected) {
  //     return;
  //   }
  //   const mimeType = fileSelected.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileSelected);
  //   // tslint:disable-next-line: variable-name
  //   reader.onload = (_event) => {
  //     this.imgSrc = reader.result;
  //     this.isImageUpdate = true;
  //     $event.target.value = '';
  //   }
  // }
  onFileSelect($event: any) {
    const fileSelected = $event.target.files[0];
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
      this.selectedFile = fileSelected; // Save the selected file
      this.isImageUpdate = true;
      $event.target.value = '';
    };
  }
  onRemoveImage() {
    this.isImageUpdate = true;
    this.imgSrc = '';
  }
  // saveUser() {
  //   if (this.userForm.valid) {
  //     const user = this.createBuildObject();
  //     if (this.isEditMode) {
  //       this.sub$.sink = this.userService.updateUser(user).subscribe(() => {
  //         this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_UPDATED_SUCCESSFULLY'));
  //         this.router.navigate(['/users']);
  //       });
  //     } else {
  //       this.sub$.sink = this.userService.addUser(user).subscribe(() => {
  //         this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_CREATED_SUCCESSFULLY'));
  //         this.router.navigate(['/users']);
  //       });
  //     }
  //   } else {
  //     this.userForm.markAllAsTouched();
  //   }
  // }
  saveUser() {
    if (this.userForm.valid) {
      const user = this.createBuildObject();
      const formData = new FormData();
      this.isLoading=true;
      // Append simple fields
      Object.keys(user).forEach((key) => {
        const value = user[key];
        if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key+"Json", JSON.stringify(value)); // Serialize arrays and objects
        } else {
          formData.append(key, typeof value === 'boolean' ? value.toString() : value || '');

        }
      });
     
      if (this.isImageUpdate && this.selectedFile) {
        formData.append('imgSrc', this.selectedFile); // Add the image file
      }
     
      if (this.isEditMode) {
        this.sub$.sink = this.userService.updateUser(formData,user.id).subscribe(() => {
          this.isLoading=false;
          this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_UPDATED_SUCCESSFULLY'));
          this.router.navigate(['/users']);
        });
      } else {
        this.sub$.sink = this.userService.addUser(formData).subscribe(() => {
          this.isLoading=false;
          this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_CREATED_SUCCESSFULLY'));
          this.router.navigate(['/users']);
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  createBuildObject(): User {
    const userId = this.userForm.get('id').value;
    const user: any = {
      id: userId,
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      email: this.userForm.get('email').value,
      phoneNumber: this.userForm.get('phoneNumber').value,
      password: this.userForm.get('password').value,
      userName: this.userForm.get('email').value,
      isActive: this.userForm.get('isActive').value,
      address: this.userForm.get('address').value,
      branchUUID: this.userForm.get('branch').value,
      companyUUID: this.companyId,
      userRoles: this.getSelectedRoles(),
      isImageUpdate: this.isImageUpdate,
     // imgSrc: this.imgSrc as string,
      userAllowedIPs: (this.userAllowedIPs.value as UserAllowedIP[]).filter(c => c.ipAddress)
    }
    return user;
  }
  getSelectedRoles() {
    return this.selectedRoles.map((role) => {
      return {
        userId: this.userForm.get('id').value,
        roleId: role.roleId
      }
    })
  }
  getRoles() {
    this.sub$.sink = this.commonService.getRoles().subscribe((roles: Role[]) => {
      this.roleList = roles.filter(role => role.id !== '5d108386-92c8-4aa8-82c5-951766a5c2a1');
     // this.roleList = roles;
      if (this.isEditMode) {
        const selectedRoleIds = this.user.userRoles.map(c => c.roleId);
        const selectedRoles = this.roleList.filter(role => selectedRoleIds.includes(role.id));
        this.selectedRoles = selectedRoles;
        this.userForm.get('selectedRoles')?.setValue(this.selectedRoles[0]);
        //this.selectedRoles = this.roleList.filter(c => selectedRoleIds.indexOf(c.id) > -1);
       // const roles = this.roleList.filter(role => selectedRoleIds.includes(role.id));
      //  this.selectedRoles=roles[0].name;
      // this.userForm.get('selectedRoles')?.setValue(this.selectedRoles);
      }
    });
  }
  getUser(evt:any){
    this.selectedRoles=[];
    const selectedRole = {
      userId: '',
      roleId: evt.id
    };
    this.selectedRoles.push(selectedRole);
  }
}