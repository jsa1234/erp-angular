import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-configuration',
  templateUrl: './branch-configuration.component.html',
  styleUrls: ['./branch-configuration.component.scss']
})
export class BranchConfigurationComponent implements OnInit {
  branchConfigurations: SystemFlagConfiguration[];
  isLoading$:boolean
  constructor(
    public translationService:TranslationService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private loader:LoaderService,
    private branchService:BranchService,
    private router:Router

    ) { }

    ngOnInit(): void {
      this.loaderShowOrHide()
      this.getBranchConfiguration()
    }
  
    getBranchConfiguration():void{
      this.route.data.subscribe((data: { branchConfig: SystemFlagConfiguration[] }) => {
        if (data.branchConfig.length<=0) 
          return;
        this.branchConfigurations = data.branchConfig
        
      });
    }
    save(config:SystemFlagConfiguration[]){
      this.isLoading$ = true
      const outputArray:SystemFlagConfiguration[] = config.map((item:SystemFlagConfiguration)=>{
        return  {
            branchUUID: item.branchUUID,
            branchSystemFlagUUID: item.branchSystemFlagUUID,
            systemFlagUUID: item.systemFlagUUID,
            value: item.value
          }
      })
      this.branchService.updateBranchConfigurations(outputArray).subscribe(()=>{
        this.toastr.success('Branch Configuration Update Successfully')
          this.router.navigate(['/branch']);
          this.isLoading$ =false;
      },
      ()=>{
        this.toastr.success('Branch Configuration Update Failed')
        this.isLoading$ = false;
      })
    }
  
    loaderShowOrHide(){
      this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
    }

}
