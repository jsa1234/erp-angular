import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from '@core/domain-classes/currency';
import { SecurityService } from '@core/security/security.service';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CompanyProfileService } from './company-profile.service';
import { ICompany } from '@core/domain-classes/company';
import { LogoType } from '@core/domain-classes/enums/logo-type';
import { BranchService } from '../branch/branch.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyProfileForm: FormGroup;
  polyChromeSrc: string | ArrayBuffer = '';
  monoChromeSrc: string | ArrayBuffer = '';
  isLoading = false;
  currencies: Currency[] = [];
  company: ICompany;
  logoType = LogoType
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private router: Router,
    private toastrService: ToastrService,
    private securityService: SecurityService,
    public translationService: TranslationService,
    private branchService:BranchService,
    public commonServ:CommonService
  ) { }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.createform();
    // this.getCurrencies();
    this.route.data.subscribe((data: { profile: ICompany }) => {
      this.company = data.profile
      this.companyProfileForm.patchValue(this.company);
      this.polyChromeSrc = this.company?.logo ? environment.apiUrl + this.company.logo : '';
      this.monoChromeSrc = this.company?.monochromeImagePath ? environment.apiUrl + this.company.monochromeImagePath : '';
    });
  }


  createform() {
    this.companyProfileForm = this.fb.group({
      companyId:         [''],
      companyUUID:       [''],
      companyCode:       ['',Validators.required],
      nameEnglish:       ['',Validators.required],
      nameSecondLanguage:[''],
      mobileNo:          [''],
      mobileCountryCode: [''],
      phoneNo:           [''],
      phoneCountryCode:  [''],
      email:             ['', [Validators.email]],
      website:           ['',[Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/a-zA-Z0-9.-]*)*\/?$/)]],
      buildingNoEnglish: [''],
      buildingNoArabic:  [''],
      streetEnglish:     [''],
      streetArabic:      [''],
      placeEnglish:      [''],
      placeArabic:       [''],
      districtEnglish:   [''],
      districtArabic:    [''],
      stateEnglish:      [''],
      stateArabic:       [''],
      countryEnglish:    [''],
      countryArabic:     [''],
      zipCodeEnglish:    [''],
      zipCodeArabic:     [''],
      googleMapUrl:      [''],
      latitude:          [''],
      longitude:         [''],
      registrationNo:    [''],
      gstVatNo:          [''],
      additionalNo:      [''],
      startDate:         [''],
      installationDate:  [''],
      renewalDate:       [''],
      logo:              [''],
      imageData:         [''],
      monochromeImagePath:[''],
      monochromeImageData:[''],
      facebookUrl: [''],
      instagramUrl:[''],
      whatsappNo:  [''],
      telegramUrl: [''],
      linkedUrl:   [''],
      twiterUrl:   [''],
      fssaiNumber: ['']
    });
  }


  // saveCompanyProfile() {
  //   if (this.companyProfileForm.invalid) {
  //     this.companyProfileForm.markAllAsTouched();
  //     return
  //   }
  //   const companyProfile: ICompany = this.companyProfileForm.getRawValue();
  //   this.isLoading = true;
  //   this.companyProfileService.updateCompany(companyProfile)
  //     .subscribe((companyProfile: ICompany) => {
  //       this.isLoading = false;
  //       this.securityService.updateProfile(companyProfile);
  //       this.toastrService.success(this.translationService.getValue('COMPANY_PROFILE_UPDATED_SUCCESSFULLY'));
  //       this.router.navigate(['dashboard']);
  //     }, () => this.isLoading = false);
  // }

 


onFileSelect(imageType: LogoType, $event: any) {
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

  reader.onload = (_event) => {
    if (imageType === this.logoType.MONOCHROME) {
      this.monoChromeSrc = reader.result;
            this.companyProfileForm.patchValue({
              monochromeImageData: fileSelected,
              monochromeImagePath: fileSelected.name
      })
    } else if (imageType === this.logoType.POLYCHROME) {
      this.polyChromeSrc = reader.result;
            this.companyProfileForm.patchValue({
        imageData: fileSelected,
        logo: fileSelected.name
      })
    }

    // Update form or perform other actions if needed
    // For example, update different form controls based on image type

    $event.target.value = '';
  }
}

// onFileSelect(imageType: LogoType, $event: any) {
//   const fileSelected: File = $event.target.files[0];
//   if (!fileSelected) {
//     return;
//   }

//   const mimeType = fileSelected.type;
//   if (mimeType.match(/image\/*/) == null) {
//     return;
//   }

//   if (imageType === this.logoType.MONOCHROME) {
//     this.monoChromeSrc = URL.createObjectURL(fileSelected);  // Create a URL for the image
//     this.companyProfileForm.patchValue({
//       monochromeImageData: fileSelected, // Store the file itself, not the Base64 string
//       monochromeImagePath: fileSelected.name
//     });
//   } else if (imageType === this.logoType.POLYCHROME) {
//     this.polyChromeSrc = URL.createObjectURL(fileSelected);  // Create a URL for the image
//     this.companyProfileForm.patchValue({
//       imageData: fileSelected, // Store the file itself, not the Base64 string
//       logo: fileSelected.name
//     });
//   }

//   // Clear the input value
//   $event.target.value = '';
// }

saveCompanyProfile() {
  if (this.companyProfileForm.invalid) {
    this.companyProfileForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  const companyProfile = this.companyProfileForm.getRawValue();

  // Append each form field to FormData
  for (const key in companyProfile) {
    if (companyProfile.hasOwnProperty(key)) {
      // If the key is an image (or file), append the file itself
      if (key === 'monochromeImageData' || key === 'imageData') {
        const file = companyProfile[key];
        if (file instanceof File) {
          formData.append(key, file, file.name); // Append the file as a form field
        }
      } else {
        // Append other form fields
        formData.append(key, companyProfile[key]);
      }
    }
  }

  this.isLoading = true;
  this.companyProfileService.updateCompany(formData)
    .subscribe((companyProfile: ICompany) => {
      this.isLoading = false;
      this.securityService.updateProfile(companyProfile);
      this.toastrService.success(this.translationService.getValue('Company Profile Updated Succssfully'));
      this.router.navigate(['dashboard']);
    }, () => this.isLoading = false);
}

}
