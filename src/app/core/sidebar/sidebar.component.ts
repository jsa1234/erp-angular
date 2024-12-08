import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserAuth } from '@core/domain-classes/user-auth';
import { SecurityService } from '@core/security/security.service';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent extends BaseComponent implements OnInit {
  appUserAuth: UserAuth = null;
  currentUrl: string="dashboard";

  constructor(
    private securityService: SecurityService,
    private commonService: CommonService,
    public translationService: TranslationService,) {
    super();
  }

  ngOnInit() {
    this.setTopLogAndName();
    this.routerNavigate();
  }

  setTopLogAndName() {
    this.sub$.sink = this.securityService.securityObject$
    .subscribe(c => {
      if (c) {
        this.appUserAuth = c;
        if (this.appUserAuth.profilePhoto) {
          this.appUserAuth.profilePhoto = `${environment.apiUrl}${this.appUserAuth.profilePhoto}`
        }
      }
    })
  }
  routerNavigate(){
    this.sub$.sink= this.commonService.currentUrl$.subscribe(c=>{
      this.currentUrl= c;
      console.log(this.currentUrl)
    });
  }
  addclass(){
   return this.currentUrl == 'accounts'?true:this.currentUrl=='journal'?true:this.currentUrl=='receipt'?true:this.currentUrl=='voucher'?true:false
  }
  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
