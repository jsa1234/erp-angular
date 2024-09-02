import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { TranslationService } from '@core/services/translation.service';
import { CompanyProfileService } from '../company-profile.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-company-configuration',
  templateUrl: './company-configuration.component.html',
  styleUrls: ['./company-configuration.component.scss']
})
export class CompanyConfigurationComponent implements OnInit {
  companyConfigurations: SystemFlagConfiguration[];
  isLoading$:boolean
  constructor(
    private route:ActivatedRoute,
    public translationService:TranslationService,
    private companyService:CompanyProfileService,
    private toastr:ToastrService,
    private loader:LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderShowOrHide()
    this.getCompanyConfiguration()
  }

  getCompanyConfiguration():void{
    this.route.data.subscribe((data: { companyConfig: SystemFlagConfiguration[] }) => {
      if (data.companyConfig.length<=0) 
        return;
      this.companyConfigurations = data.companyConfig
      
    });
  }
  save(config:SystemFlagConfiguration[]){
    this.isLoading$ = true
    const outputArray:SystemFlagConfiguration[] = config.map((item:SystemFlagConfiguration)=>{
      return  {
          companyUUID: item.companyUUID,
          companySystemFlagUUID: item.companySystemFlagUUID,
          systemFlagUUID: item.systemFlagUUID,
          value: item.value
        }
    })
    this.companyService.updateCompanyConfigurations(outputArray).subscribe(()=>{
      this.toastr.success('Company Configuration Update Successfully')
      this.isLoading$ =false
    },
    ()=>{
      this.toastr.success('Company Configuration Update Failed')
      this.isLoading$ = false

    })
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
}
