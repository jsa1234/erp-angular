import { Component, OnInit } from '@angular/core';
import { Action } from '@core/domain-classes/action';
import { PageAction } from '@core/domain-classes/page-action';
import { Page } from '@core/domain-classes/page';
import { ActionService } from '@core/services/action.service';
import { PageActionService } from '@core/services/page-action.service';
import { PageService } from '@core/services/page.service';
import { Observable, forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { RoleService } from '../role.service';
import { Role } from '@core/domain-classes/role';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { UserClaimService } from '@core/services/user-claim.service';
import { UserTypes } from '@core/domain-classes/enums/user-type.enum';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent extends BaseComponent implements OnInit {
  pageActions$: Observable<PageAction[]>
  pages$: Observable<Page[]>;
  actions$: Observable<Action[]>;
  loading$: Observable<boolean>;
  role: Role;
  showPermission: Observable<boolean>;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private userClaimService: UserClaimService,
    private pageActionService: PageActionService,
    private roleService: RoleService,
    private translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.sub$.sink = this.activeRoute.data.subscribe(
      (data: { role: Role }) => {
        if (data.role) {
          this.role = data.role;
        } else {
          this.role = {
            roleClaims: [],
            userRoles: []
          };
        }
      });
      if(this.role?.roleType == UserTypes.WEB_USER || this.role?.roleType == UserTypes.DEVICE_USER ){
        this.showRoleClaims(this.role.roleType)
      }else{
        this.showPermission = of(false)
      }
  }



  getPageActions(): void {
    this.pageActionService.getAll();
  }

  manageRole(role: Role): void {
    if (!role.name) {
      this.toastrService.error(this.translationService.getValue('VALIDATIONS.PLEASE_ENTER_ROLE_NAME'));
      return;
    }

    if (role.roleClaims.length == 0) {
      this.toastrService.error(this.translationService.getValue('VALIDATIONS.PLEASE_SELECT_AT_LEAT_ONE_PERMISSION'));
      return;
    }

    if (!role.id)
      this.sub$.sink = this.roleService.addRole(role).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.ROLE_SAVED_SUCCESSFULLY'));
        this.router.navigate(['/roles']);
      });
    else
      this.sub$.sink = this.roleService.updateRole(role).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.ROLE_UPDATED_SUCCESSFULLY'));
        this.router.navigate(['/roles']);
      });
  }

  showRoleClaims(userType: number) {
    this.loading$=of(true)
    this.showPermission=of(false)
    const actions$ = this.userClaimService.getAllActionsByContextType(userType);
    const pages$ = this.userClaimService.getAllPageByContextType(userType);
    
    forkJoin([actions$, pages$]).subscribe(([actions, pages]) => {
      this.actions$ = of(actions);
      this.pages$ = of(pages);
      this.loading$ = this.pageActionService.loaded$;
      this.pageActions$ = this.pageActionService.entities$;
      this.getPageActions();
      this.loading$=of(false)
      this.showPermission=of(true)
    });
  }
}
