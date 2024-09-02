import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company, ICompany } from '@core/domain-classes/company';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { FormatDamageEntry } from '../manage-damage-entry/format-Damage-entry.class';
import { DamageEntryProductList } from '@core/domain-classes/damage-entry-product-list,interface';

@Component({
  selector: 'app-damage-entry-details',
  templateUrl: './damage-entry-details.component.html',
  styleUrls: ['./damage-entry-details.component.scss']
})
export class DamageEntryDetailsComponent extends BaseComponent implements OnInit {
  companyProfile: Company;
  companyProfilePdf: ICompany;
  damageProductList: DamageEntryProductList[];
  damageEntry: IDamageEntry;
  constructor(public translate:TranslationService,  private routes: ActivatedRoute,   private clonerService: ClonerService,
    private securityService: SecurityService,) { super() }

  ngOnInit(): void {
    this.getDamageEntry();
    // this.subScribeCompanyProfile();
  }
  // subScribeCompanyProfile() {
  //   this.securityService.companyProfile.subscribe((data:ICompany) => {
  //     this.companyProfilePdf = data;
  //     this.companyProfile = new Company(data);
  //   });
  // }

  getDamageEntry():void{
    this.sub$.sink = this.routes.data.subscribe((data:{damageEntry:IDamageEntry})=>{
      if(!data.damageEntry)return;
      this.damageEntry = data.damageEntry
      this.damageProductList =  new FormatDamageEntry(undefined,undefined,undefined,this.damageEntry.damageDetails,undefined).formatDataForEdit();
    })
  }

}
