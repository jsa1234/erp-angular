import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from '@core/domain-classes/action';
import { UserTypes } from '@core/domain-classes/enums/user-type.enum';
import { Page } from '@core/domain-classes/page';
import { PageAction } from '@core/domain-classes/page-action';
import { User } from '@core/domain-classes/user';
import { PageActionService } from '@core/services/page-action.service';
import { TranslationService } from '@core/services/translation.service';
import { UserClaimService } from '@core/services/user-claim.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent extends BaseComponent implements OnInit {
  pageActions$: Observable<PageAction[]>
  pages$: Observable<Page[]>;
  actions$: Observable<Action[]>;
  loading$: Observable<boolean>;
  loadingPage$: Observable<boolean>;
  loadingAction$: Observable<boolean>;
  user: User;

  constructor(
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private userClaimService: UserClaimService,
    private pageActionService: PageActionService,
    private userService: UserService,
    private translationService: TranslationService,
    private location:Location) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
      });

      this.getActions()
      this.getPages()
    this.loading$ = this.pageActionService.loaded$
    this.pageActions$ = this.pageActionService.entities$
    this.getPageActions();

  }

  getActions(): void {
    this.userClaimService.getAllActionsByContextType(UserTypes.WEB_USER).subscribe((res:Action[])=>{
      this.actions$ = of(res)
    })
  }

  getPages(): void {
    this.userClaimService.getAllPageByContextType(UserTypes.WEB_USER).subscribe((res:Page[])=>{
      this.pages$ = of(res)
    })
  }

  getPageActions(): void {
    this.pageActionService.getAll();
  }

  manageUserClaimAction(user: User): void {
    this.sub$.sink = this.userService.updateUserClaim(user.userClaims, user.id).subscribe(() => {
      this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.USER_PERMISSION_UPDATED_SUCCESSFULLY'));
      this.location.back()
    })
  }
}
