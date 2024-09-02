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
    private securityService: SecurityService
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
      mobileNo: [''],
      mobileCountryCode: [''],
      phoneNo: [''],
      phoneCountryCode: [''],
      email: [''],
      website: [''],
      buildingNoEnglish: [''],
      streetEnglish: [''],
      placeEnglish: [''],
      districtEnglish: [''],
      stateEnglish: [''],
      countryEnglish: [''],
      zipCodeEnglish: [''],
      gstVatNo: [''],
      startDate: ['',Validators.required],
      installationDate: ['',Validators.required],
      renewalDate: ['',Validators.required],
      logo: [''],
      imageData: [''],
      registrationNo: [''],
      additionalNo: [''],
      fssaiNumber: [''],
      isHeadOffice: [{ value: false, disabled: true }],
    });

  }
  get isHeadOffice():boolean {return this.branchForm.get('isHeadOffice').value}
  saveBranch() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    const branchDetail: IBranch = this.branchForm.getRawValue();
    this.isLoading = true;
    if (this.isUpdate) {
      this.brancService.updateBranch(branchDetail).subscribe(
        (branch: IBranch) => {
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
      this.brancService.saveBranch(branchDetail).subscribe(
        (branch: IBranch) => {
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

  onFileSelect($event) {
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
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.branchForm.patchValue({
        imageData: reader.result.toString(),
        logoUrl: fileSelected.name,
      });
      $event.target.value = '';
    };
  }

  cancel():void{
    this.router.navigate(['/branch'], { relativeTo: this.route });
  }
}
