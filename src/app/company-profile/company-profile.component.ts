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
    public translationService: TranslationService) { }

  ngOnInit(): void {
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
      email:             [''],
      website:           [''],
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


  saveCompanyProfile() {
    if (this.companyProfileForm.invalid) {
      this.companyProfileForm.markAllAsTouched();
      return
    }
    const companyProfile: ICompany = this.companyProfileForm.getRawValue();
    this.isLoading = true;
    this.companyProfileService.updateCompany(companyProfile)
      .subscribe((companyProfile: ICompany) => {
        this.isLoading = false;
        this.securityService.updateProfile(companyProfile);
        this.toastrService.success(this.translationService.getValue('COMPANY_PROFILE_UPDATED_SUCCESSFULLY'));
        this.router.navigate(['dashboard']);
      }, () => this.isLoading = false);
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
  //     this.logoSrc = reader.result;
  //     this.companyProfileForm.patchValue({
  //       imageData: reader.result.toString(),
  //       logo: fileSelected.name
  //     })
  //     $event.target.value = '';
  //   }
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
              monochromeImageData: reader.result.toString(),
        monochromeImagePath: fileSelected.name
      })
    } else if (imageType === this.logoType.POLYCHROME) {
      this.polyChromeSrc = reader.result;
            this.companyProfileForm.patchValue({
        imageData: this.polyChromeSrc.toString(),
        logo: fileSelected.name
      })
    }

    // Update form or perform other actions if needed
    // For example, update different form controls based on image type

    $event.target.value = '';
  }
}

}
