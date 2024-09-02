import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ReminderScheduler } from '@core/domain-classes/reminder-scheduler';
import { UserAuth } from '@core/domain-classes/user-auth';
import { SecurityService } from '@core/security/security.service';
import { CommonService } from '@core/services/common.service';
import { SignalrService } from '@core/services/signalr.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { BaseComponent } from 'src/app/base.component';
import { LanguageFlag, Languages } from './languages';
import { ICompany } from '@core/domain-classes/company';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchService } from 'src/app/branch/branch.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0,0,0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent extends BaseComponent implements OnInit {


  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.altKey && event.key.toLowerCase() === 'p') {
      this.openPos()
    }
  }



  @ViewChild('selectElem', { static: true }) el: ElementRef;
  @Input()
  public lead: any;
  navbarOpen = false;
  appUserAuth: UserAuth = null;
  language: LanguageFlag;
  notificationCount: number = 0;
  notificationUserList: ReminderScheduler[] = [];
  languages: LanguageFlag[] = [];
  profilePath = '';
  logoImage = '';
  branchForm:FormGroup;
  constructor(
    private router: Router,
    private securityService: SecurityService,
    private signalrService: SignalrService,
    private translationService: TranslationService,
    private commonService: CommonService,
    private fb:FormBuilder,
    private branchService:BranchService
  ) {
    super();
  }

  ngOnInit(): void {
    this.languages = Languages.languages;
    this.setTopLogAndName();
    this.setDefaultLanguage();
    this.getUserNotification();
    this.createForm()
    // this.getNotificationList();
    this.companyProfileSubscription();

  }

  companyProfileSubscription() {
    this.securityService.companyProfile.subscribe((profile:ICompany) => {
      if (profile) {
        this.logoImage = profile.logo;
      }
    });
  }

  getUserNotification() {
    this.sub$.sink = this.signalrService.userNotification$
      .subscribe(c => {
        this.getUserNotificationCount();
        this.getNotificationList();
      });
  }

  getUserNotificationCount() {
    this.sub$.sink = this.commonService.getUserNotificationCount()
      .subscribe(c => {
        this.notificationCount = c;
      });
  }

  getNotificationList() {
    this.sub$.sink = this.commonService.getTop10UserNotification()
      .subscribe(c => {
        this.notificationUserList = c;
      });
  }

  setDefaultLanguage() {
    const lang = this.translationService.getSelectedLanguage();
    if (lang) this.setLanguageWithRefresh(lang);
  }

  setLanguageWithRefresh(lang: string) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    if(lang=='ar')
      document.getElementsByTagName('html')[0].setAttribute('dir','rtl')
      else
      document.getElementsByTagName('html')[0].setAttribute('dir','ltr')


  }

  setNewLanguageRefresh(lang: string) {
    this.sub$.sink = this.translationService
      .setLanguage(lang)
      .subscribe((response) => {
        this.setLanguageWithRefresh(response['LANGUAGE']);
      });
  }

  setTopLogAndName() {
    this.sub$.sink = this.securityService.securityObject$.subscribe((c:UserAuth) => {
      if (c) {
        this.appUserAuth = c;
        if (this.appUserAuth.profilePhoto) {
          this.profilePath = environment.apiUrl + this.appUserAuth.profilePhoto;
        }
      }
    });
  }

  onLogout(): void {
    this.signalrService.logout(this.appUserAuth.id);
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

  onMyProfile(): void {
    this.router.navigate(['/my-profile']);
  }

  public togglediv() {
    if (this.lead.className === 'toggled') {
      this.lead.className = '';
    } else {
      this.lead.className = 'toggled';
    }
  }




  openPos():void {
    this.router.navigate(['/pos']);
  }

  createForm():void{
    this.branchForm = this.fb.group({
      branch:['']
    })
  }
  parentBranchHandlerFunction(event):void{
    this.branchService.setBranchUUID(event)
  }
}
