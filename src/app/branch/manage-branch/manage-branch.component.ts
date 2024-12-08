import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranch } from '@core/domain-classes/branch';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from '../branch.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ICompany } from '@core/domain-classes/company';
import { BranchTypeArray, BranchTypeMapping } from '@core/domain-classes/enums/branch-type.enum';
import { SecurityService } from '@core/security/security.service';
import { CommonService } from '@core/services/common.service';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss'],
})
export class ManageBranchComponent extends BaseComponent implements OnInit {
  branch: IBranch;
  branchForm: FormGroup;
  componentId: string;
  isLoading: boolean = false;
  companyId: string;
  branchTypeList: BranchTypeMapping[] = BranchTypeArray;
  imgSrc: string | ArrayBuffer = '';
  isUpdate: boolean = false;

  constructor(
    public translationService: TranslationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private brancService: BranchService,
    private router: Router,
    private toastrService: ToastrService,
    private securityService: SecurityService,
    public commonServ:CommonService
  ) {
    super();
  }

  ngOnInit(): void {
    this.securityService.companyProfile.subscribe((company: ICompany) => {
      this.companyId = company.companyUUID;
    });
    this.getSingleBranch();
  }

  getSingleBranch(): void {
    this.sub$.sink = this.route.data.subscribe(
      (data: { branchData:IBranch }) => {
        this.createform();
        if (!data.branchData) {
          this.isUpdate = false
          return;
        }
        
        this.isUpdate = true
        this.branch = { ...data.branchData };
        this.branchForm.patchValue(this.branch);
        this.imgSrc = data.branchData.logo ? environment.apiUrl + data.branchData.logo : '';
      }
    );
  
  }

  createform() {
    this.branchForm = this.fb.group({
      branchUUID: [''],
      companyUUID: [this.companyId],
      branchType: ['', Validators.required],
      nameEnglish: ['', Validators.required],
      mobileNo: ['',[Validators.pattern(/^\d{10}$/), Validators.minLength(10),Validators.maxLength(10)]],
      mobileCountryCode: [''],
      phoneNo: [''],
      phoneCountryCode: [''],
      email: ['', [Validators.email]],
      website: ['',[Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/a-zA-Z0-9.-]*)*\/?$/)]],
      buildingNoEnglish: [''],
      streetEnglish: [''],
      placeEnglish: [''],
      districtEnglish: [''],
      stateEnglish: [''],
      countryEnglish: [''],
      zipCodeEnglish: [''],
      gstVatNo: [''],
     // startDate: ['',Validators.required],
     // installationDate: ['',Validators.required],
     // renewalDate: ['',Validators.required],
      logo: [''],
      imageData: [''],
      registrationNo: [''],
      additionalNo: [''],
      fssaiNumber: [''],
      //isHeadOffice: [{ value: false, disabled: true }],
      isHeadOffice: [false],

    });

  }
  get isHeadOffice():boolean {return this.branchForm.get('isHeadOffice').value}
  saveBranch() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    console.log('branchform',this.branchForm)
    // const startDate = new Date(this.branchForm.value.startDate);
    // const installationDate = new Date(this.branchForm.value.installationDate);
    // if(this.branchForm.value.startDate > this.branchForm.value.installationDate){
    //   this.toastrService.warning('Start date cannot be after installation date');
    //   return;

    // }
    
    const formData = new FormData();
    Object.keys(this.branchForm.controls).forEach(key => {
      let value = this.branchForm.get(key)?.value;

      // if (key === 'startDate' || key === 'installationDate' || key === 'renewalDate') {
      //   if (value) {
      //     const dateObj = new Date(value);
      //     value = dateObj.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      //   }
      // }

      if (key === 'imageData' && value) {
        formData.append(key, value);
      }
      else if (key == 'branchType' ){
        formData.append(key,  value.toString());
      }
      else{
        formData.append(key, value ? value.toString() : '');
      }
    });
    
   
    const branchDetail: IBranch = this.branchForm.getRawValue();
    this.isLoading = true;
    if (this.isUpdate) {
      this.brancService.updateBranch(formData,this.branchForm.value.branchUUID).subscribe(
        () => {
          this.isLoading = false;
          this.toastrService.success(
            this.translationService.getValue('RESPONSE_MESSAGE.BRANCH_UPDATED_SUCCESSFULLY')
          );
          this.router.navigate(['/branch']);
        },
        () => {
          this.toastrService.error('Branch Updated Failed');
          this.isLoading = false
        }
      );
    } else {
      this.brancService.saveBranch(formData).subscribe(
        () => {
          this.isLoading = false;
          this.toastrService.success(
            this.translationService.getValue('RESPONSE_MESSAGE.BRANCH_CREATED_SUCCESSFULLY')
          );
          this.router.navigate(['/branch']);
        },
        () => {
          this.toastrService.error('Branch Create Failed');
          this.isLoading = false
        }
      );
    }
  }

  // onFileSelect($event) {
  //   const fileSelected: File = $event.target.files[0];
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
  //     this.branchForm.patchValue({
  //       imageData: reader.result.toString(),
  //       logoUrl: fileSelected.name,
  //     });
  //     $event.target.value = '';
  //   };
  // }

  onFileSelect($event: any) {
    const fileSelected: File = $event.target.files[0];
    if (!fileSelected) {
      return;
    }
  
    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    // Store the file directly in the form, without Base64 conversion
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.branchForm.patchValue({
        imageData: fileSelected,
        logoUrl: fileSelected.name,
      });
    }
   
  
    // Clear the file input value
    $event.target.value = '';
  }
  

  cancel():void{
    this.router.navigate(['/branch'], { relativeTo: this.route });
  }

}
