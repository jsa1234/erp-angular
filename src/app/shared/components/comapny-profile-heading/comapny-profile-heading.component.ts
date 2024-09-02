import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IBranch } from '@core/domain-classes/branch';
import { Company, ICompany } from '@core/domain-classes/company';
import { SecurityService } from '@core/security/security.service';
import { Observable, of } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-comapny-profile-heading',
  templateUrl: './comapny-profile-heading.component.html',
  styleUrls: ['./comapny-profile-heading.component.scss']
})
export class ComapnyProfileHeadingComponent extends BaseComponent implements OnChanges {
  @Input() ProfileType:number
  @Input() branchUUID:string
  companyProfile: Company;
  type:number
  branchDetail: IBranch;
  isloading$:Observable<boolean> = of(false)
  constructor(private securityService:SecurityService, private branchService:BranchService) { super()}

  ngOnChanges(changes:SimpleChanges): void {
    this.subScribeCompanyProfile()
      this.type = this.ProfileType
      if(changes['branchUUID']){
        this.getBranch(this.branchUUID);
      }
  }
  subScribeCompanyProfile() {
    this.isloading$ = of(true)
    this.securityService.companyProfile.subscribe((data:ICompany) => {
      this.companyProfile = new Company(data);
    this.isloading$ = of(false)

    });
  }

  getBranch(branchUUID:string):void{
    this.isloading$ = of(true)
    this.sub$.sink = this.branchService.getSingleBranch(branchUUID).subscribe((res:IBranch)=>{
      this.branchDetail = res
    this.isloading$ = of(false)

    })
  }


  public get branchAddress(): string {
    if(!this.branchDetail)return;
    const components = [
     this.branchDetail.buildingNoEnglish,
     this.branchDetail.stateEnglish,
     this.branchDetail.placeEnglish,
     this.branchDetail.districtEnglish,
     this.branchDetail.stateEnglish,
     this.branchDetail.countryEnglish,
     this.branchDetail.zipCodeEnglish ? `Zip Code: ${this.branchDetail.zipCodeEnglish}` : null
    ];
    return components.filter(c => c).join(', ');
  }
  public get branchName(): string {
    if(!this.branchDetail)return;
    return this.branchDetail.nameEnglish;
  }
  public get branchPhoneNo(): string {
    if(!this.branchDetail)return;
    return `${this.branchDetail.phoneCountryCode} ${this.branchDetail.phoneNo}`
  }
  public get branchMobileNo(): string {
    if(!this.branchDetail)return;
    return `${this.branchDetail.mobileCountryCode} ${this.branchDetail.mobileNo}`
  }
  public get branchEmail(): string {
    if(!this.branchDetail)return;
    return this.branchDetail.email;
  }

  public get branchGSTNo():string{
    if(!this.branchDetail)return;
    return this.branchDetail.gstVatNo;
  }
}
