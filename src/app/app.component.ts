import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICompany } from '@core/domain-classes/company';
import { IDevice } from '@core/domain-classes/device';
import { OnlineUser } from '@core/domain-classes/online-user';
import { UserAuth } from '@core/domain-classes/user-auth';
import { SecurityService } from '@core/security/security.service';
import { CommonService } from '@core/services/common.service';
import { SignalrService } from '@core/services/signalr.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { getMessaging, getToken } from 'firebase/messaging';
import { filter } from 'rxjs/operators';
import { BaseComponent } from './base.component';
import { DeviceService } from './device/device.service';
import { LoaderService } from '@shared/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  isLoading$: any;

  constructor(
    private signalrService: SignalrService,
    private securityService: SecurityService,
    public translate: TranslateService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private deviceService: DeviceService,
    private commonService: CommonService,
    private loader:LoaderService
  ) {
    super();
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    this.setLanguage();
    this.setProfile();
    this.companyProfileSubscription();
  }

  setProfile() {
    this.route.data.subscribe((data: { profile: ICompany }) => {
      if (data.profile) {
        this.securityService.updateProfile(data.profile);
      }
    });
  }

  companyProfileSubscription() {
    this.securityService.companyProfile.subscribe((profile) => {
      if (profile) {
        this.titleService.setTitle(profile.nameEnglish);
      }
    });
  }

  setLanguage() {
    const currentLang = this.translationService.getSelectedLanguage();
    if (currentLang) {
      this.sub$.sink = this.translationService
        .setLanguage(currentLang)
        .subscribe(() => {});
    } else {
      const browserLang = this.translate.getBrowserLang();
      const lang = browserLang.match(/en|ar/) ? browserLang : 'en';
      this.sub$.sink = this.translationService
        .setLanguage(lang)
        .subscribe(() => {});
    }
  }

  ngOnInit() {
    this.routerNavigate();
    this.getDevices();
    this.signalrService.startConnection().then((resolve) => {
      if (resolve) {
        this.signalrService.handleMessage();
        this.getAuthObj();
      }
    });

    this.requestPermission()
    // this.loaderShowOrHide()
  }
  getAuthObj() {
    this.sub$.sink = this.securityService.securityObject$.subscribe(
      (c: UserAuth) => {
        if (c) {
          const online: OnlineUser = {
            email: c.email,
            id: c.id,
            connectionId: this.signalrService.connectionId,
          };
          this.signalrService.addUser(online);
        }
      }
    );
  }

  routerNavigate() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (
          event.url.indexOf('product') > -1 ||
          event.url.indexOf('unit') > -1 ||
          event.url.indexOf('tax') > -1 ||
          event.url.indexOf('brand') > -1 ||
          event.url.indexOf('subcategory') > -1 ||
          event.url.indexOf('category') > -1
        ) {
          this.commonService.setCurrentUrl('product'); // setting url for product
        } 
        else if(event.url.indexOf('branch')>-1){
          this.commonService.setCurrentUrl('branch');
        }
        else if (event.url.indexOf('supplier') > -1) {
          this.commonService.setCurrentUrl('supplier');  // setting url for supplier
        } 
        else if (event.url.indexOf('customer') > -1) {
          this.commonService.setCurrentUrl('customer'); // setting url for customer
        } 
        else if (event.url.indexOf('employee') > -1) {
          this.commonService.setCurrentUrl('employee'); // setting url for employee
        } 
        else if (
          event.url.indexOf('accountHead') > -1 ||
          event.url.indexOf('receiptVoucher') > -1 ||
          event.url.indexOf('paymentVoucher') > -1 ||
          event.url.indexOf('journal') > -1 || 
          event.url.indexOf('openingBalance') > -1 ||
          event.url.indexOf('payment-merchant') > -1 ||
          event.url.indexOf('bank') > -1 ||
          event.url.indexOf('pos-device') > -1 || 
          event.url.indexOf('pos-printer') > -1
        ) {
          this.commonService.setCurrentUrl('accounts'); // setting url for accounts
        } 
        else if (event.url.indexOf('opening-stock') > -1 || event.url.indexOf('stock-transfer')>-1 || event.url.indexOf('damage-entry') > -1 ) {
          this.commonService.setCurrentUrl('inventory'); // setting url for inventory
        }
        else if (
          event.url.indexOf('purchase-invoice') > -1
        ) {
          this.commonService.setCurrentUrl('purchase-invoice');
        } 
        else if (event.url.indexOf('purchase-return') > -1) {
          this.commonService.setCurrentUrl('purchase-return');
        }
        else if (event.url.indexOf('sale-order') > -1) {
          this.commonService.setCurrentUrl('sale-order');
        } 
        else if (event.url.indexOf('sales-invoice') > -1) {
          this.commonService.setCurrentUrl('sales-invoice');
        } 
        else if (event.url.indexOf('sales-return') > -1) {
          this.commonService.setCurrentUrl('sales-return');
        } 
        else if (
          event.url.indexOf('purchase-report') > -1 ||
          event.url.indexOf('sales-report') > -1 ||
          event.url.indexOf('vat-report') > -1 ||
          event.url.indexOf('ledger-report') > -1 ||
          event.url.indexOf('stock-report') > -1 ||
          event.url.indexOf('daily-activity-report') > -1 ||
          event.url.indexOf('purchaseReturn-report') > -1 
        ) {
          this.commonService.setCurrentUrl('reports');
        } 
        else if(event.url.indexOf('payment-transactions') > -1){
          this.commonService.setCurrentUrl('payment-transactions')
        }
        // else if (event.url.indexOf('purchase-order-request') > -1) {
        //   this.commonService.setCurrentUrl('purchase-order-request');
        // } 

        // else if (
        //   event.url.indexOf('my-documents') > -1 ||
        //   event.url.indexOf('document-categories') > -1 ||
        //   event.url.indexOf('documents') > -1 ||
        //   event.url.indexOf('document-audit-trails') > -1
        // ) {
        //   this.commonService.setCurrentUrl('documents-library');
        // } 
        // else if (
        //   event.url.indexOf('expense') > -1 ||
        //   event.url.indexOf('expense-category') > -1
        // ) {
        //   this.commonService.setCurrentUrl('expense');
        // }
        //  else if (event.url.indexOf('reminders') > -1) {
        //   this.commonService.setCurrentUrl('reminders');
        // } 
        else if (
          event.url.indexOf('users') > -1 ||
          event.url.indexOf('sessions') > -1
        ) {
          this.commonService.setCurrentUrl('users');
        } 
        else if (event.url.indexOf('roles') > -1) {
          this.commonService.setCurrentUrl('roles');
        } 
        else if (
          event.url.indexOf('email-smtp') > -1 ||
          event.url.indexOf('emailtemplate') > -1 ||
          event.url.indexOf('send-email') > -1
        ) {
          this.commonService.setCurrentUrl('email');
        }
        // || event.url.indexOf('country') > -1 || event.url.indexOf('cities') > -1
        else if (event.url.indexOf('company-profile') > -1 ||event.url.indexOf('financial-year') > -1 || event.url.indexOf('year-end-process') > -1 || event.url.indexOf('documents') > -1) {
          this.commonService.setCurrentUrl('settings');
        } 
        else if (
          event.url.indexOf('login-audit') > -1 ||
          event.url.indexOf('logs') > -1
        ) {
          this.commonService.setCurrentUrl('logs');
        } 
        else if (
          event.url.indexOf('state') > -1 ||
          event.url.indexOf('country') > -1 ||
          event.url.indexOf('district') > -1
        ) {
          this.commonService.setCurrentUrl('locations');
        } 
        else if (event.url.indexOf('device') > -1) {
          this.commonService.setCurrentUrl('device');
        } 
        else {
          this.commonService.setCurrentUrl('');
        }
      });
  }

  getDevices() {
    this.sub$.sink = this.deviceService
      .GetDevices()
      .subscribe((res: IDevice[]) => {
        this.deviceService.SetDevices(res);
      });
  }



  requestPermission(){
    const messaging = getMessaging();
    getToken(messaging,{vapidKey:environment.firebase.vpaidKey}).then(
      (currentToken)=>{
        if(currentToken){
          console.log("Token Generate Success");
          console.log(currentToken);
        }
        else{
          console.log("Something went wrong when generate token");
        }
      }
    )
  }

  loaderShowOrHide() {
    this.loader.isLoading$.subscribe(
      (isLoading) => (this.isLoading$ = isLoading)
    );
  }
  
}
