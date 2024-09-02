import { Component, OnInit } from '@angular/core';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { TranslationService } from '@core/services/translation.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent implements OnInit {

  userConfigurations: SystemFlagConfiguration[];
  isLoading$:boolean
  constructor(
    public translationService:TranslationService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private loader:LoaderService,
    private userService:UserService

    ) { }

    ngOnInit(): void {
      this.loaderShowOrHide()
      this.getUserConfiguration()
    }
  
    getUserConfiguration():void{
      this.route.data.subscribe((data: { userConfig: SystemFlagConfiguration[] }) => {
        if (data.userConfig.length<=0) 
          return;
        this.userConfigurations = data.userConfig
        
      });
    }
    save(config:SystemFlagConfiguration[]){
      this.isLoading$ = true
      const outputArray:SystemFlagConfiguration[] = config.map((item:SystemFlagConfiguration)=>{
        return  {
            userUUID: item.userUUID,
            userSystemFlagUUID: item.userSystemFlagUUID,
            systemFlagUUID: item.systemFlagUUID,
            value: item.value
          }
      })
      this.userService.updateUserConfigurations(outputArray).subscribe(()=>{
        this.toastr.success('User Configuration Update Successfully')
        this.isLoading$ =false
      },
      ()=>{
        this.toastr.success('User Configuration Update Failed')
        this.isLoading$ = false
  
      })
    }
  
    loaderShowOrHide(){
      this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
    }


}
