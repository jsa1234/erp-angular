import { Component, OnInit } from '@angular/core';
import { ICompany } from '@core/domain-classes/company';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { SecurityService } from '@core/security/security.service';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent implements OnInit {
  companyProfile: ICompany;
  currentFinancialYear: FinancialYearInfo;

  constructor(private securityService: SecurityService,public translationService: TranslationService,    private financialYearService: CurrentFinancialYearService,) {
    super();
  }

  ngOnInit(): void {
    this.companyProfileSubscription();
    this.getCurrentFinancialYear()
  }

  companyProfileSubscription() {
    this.securityService.companyProfile.subscribe((profile:ICompany) => {
      if (profile) {
        this.companyProfile = profile;
      }
    });
  }
  getCurrentFinancialYear(){
    this.sub$.sink = this.financialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
      this.currentFinancialYear = res
    })
  }
}
