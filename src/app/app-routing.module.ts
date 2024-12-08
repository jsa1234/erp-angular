import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { AppComponent } from './app.component';
import { CompanyProfileResolver } from './company-profile/company-profile.resolver';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { AccessDeniedComponent } from '@core/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { profile: CompanyProfileResolver },
    children: [
      {
      path: 'login',
      loadChildren: () =>
        import('./login/login.module')
          .then(m => m.LoginModule)
    },
    {
      path:'pos',
      loadChildren:()=> import('./pos/pos.module').then(m=>m.PosModule)
    },
    {
      path: '',
      component: LayoutComponent,
      resolve: { profile: CompanyProfileResolver },
      children: [
 {
          path: '',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./dashboard/dashboard.module')
              .then(m => m.DashboardModule)
        },

        {
          path: 'branch',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./branch/branch.module')
              .then(m => m.BranchModule)
        },
        {
          path: 'product',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./product/product.module')
              .then(m => m.ProductModule)
        },

        {
          path:'category',
          canLoad: [AuthGuard],
          loadChildren:()=>
          import('./category/category.module')
          .then(m=>m.CategoryModule)

        },
        {
          path:'subcategory',
          canLoad: [AuthGuard],
          loadChildren:()=>
          import('./sub-category/sub-category.module')
          .then(m=>m.SubCategoryModule)

        },
        {
          path:'brand',
          canLoad: [AuthGuard],
          loadChildren:()=>
          import('./brand/brand.module')
          .then(m=>m.BrandModule)

        },
        {
          path: 'unit',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./unit/unit.module').then(
              m => m.UnitModule
            )
        },
        {
          path: 'tax',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./tax/tax.module').then(
              m => m.TaxModule
            )
        },
        {
          path: 'supplier',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./supplier/supplier.module').then(
              m => m.SupplierModule
            )
        },
        {
          path: 'customer',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./customer/customer.module').then(
              m => m.CustomerModule
            )
        },
        {
          path: 'employee',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./employee/employee.module').then(
              m => m.EmployeeModule
            )
        },
        {
          path: 'accountHead',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/accounts/accounts.module').then(
              m => m.AccountsModule
            )
        },
        {
          path: 'openingBalance',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/account-opening-balance/account-opening-balance.module').then(
              m => m.AccountOpeningBalanceModule
            )
        },
        {
          path: 'paymentVoucher',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/voucher/voucher.module').then(
              m => m.VoucherModule
            )
        },
        {
          path: 'receiptVoucher',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/receipt/receipt.module').then(
              m => m.ReceiptModule
            )
        },
        {
          path: 'journal',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/journal/journal.module').then(
              m => m.JournalModule
            )
        },
        {
          path: 'bank',
          // canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/bank/bank.module').then(
              m => m.BankModule
            )
        },
        {
          path: 'payment-merchant',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/payment-merchant/payment-merchant.module').then(
              m => m.PaymentMerchantModule
            )
        },
        {
          path: 'pos-device',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/pos-device/pos-device.module').then(
              m => m.PosDeviceModule
            )
        },
        {
          path: 'pos-printer',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./accounts/pos-printer/pos-printer.module').then(
              m => m.PosPrinterModule
            )
        },
        {
          path: 'inventory',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./inventory/inventory.module')
              .then(m => m.InventoryModule)
        },
        {
          path: 'purchase-invoice',
          canLoad: [AuthGuard],
          loadChildren: () => import('./purchase/purchase.module')
            .then(m => m.PurchaseModule)
        },

        {
          path: 'purchase-return',
          canLoad: [AuthGuard],
          loadChildren: () => import('./purchase-return/purchase-return.module')
            .then(m => m.PurchaseReturnModule)
        },
        {
          path: 'sale-order',
          canLoad: [AuthGuard],
          loadChildren: () => import('./sale-order/sale-order.module')
            .then(m => m.SaleOrderModule)
        }, 
        {
          path: 'sales-invoice',
          canLoad: [AuthGuard],
          loadChildren: () => import('./sales/sales.module')
            .then(m => m.SalesModule)
        }, {
          path: 'sales-return',
          canLoad: [AuthGuard],
          loadChildren: () => import('./sales-return/sales-return.module')
            .then(m => m.SaleReturnModule)
        },
        {
          path: 'purchase-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/purchase-report/purchase-report.module').then(
              m => m.PurchaseReportModule
            )
        },{
          path: 'purchaseReturn-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/purchase-return-report/purchase-return-report.module').then(
              m => m.PurchaseReturnReportModule
            )
        },{
          path: 'sales-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/sales-report/sales-report.module').then(
              m => m.SalesReportModule
            )
        },
        {
          path: 'sale-return-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/sale-return-report/sale-return-report.module').then(
              m => m.SaleReturnReportModule
            )
        },
        {
          path: 'vat-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/vat-report/vat-report.module').then(
              m => m.VATReportModule
            )
        },
        {
          path: 'ledger-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/statement-of-accounts/statement-of-accounts.module').then(
              m => m.StatementOfAccountsModule
            )
        },
        {
          path: 'stock-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/stock-report/stock-report.module').then(
              m => m.StockReportModule
            )
        },
        {
          path: 'daily-activity-report',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./reports/daily-activity-report/daily-activity-report.module').then(
              m => m.DailyActivityReportModule
            )
        },
        {
          path: 'payment-transactions',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./payment-transactions/payment-transactions.module').then(
              m => m.PaymentTransactionsModule
            )
        },
        {
          path: 'country',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./locations/country/country.module').then(
              m => m.CountryModule
            )
        },
        {
          path: 'state',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./locations/state/state.module').then(
              m => m.StateModule
            )
        },
        {
          path: 'district',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./locations/district/district.module').then(
              m => m.DistrictModule
            )
        },
        {
          path: 'roles',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./role/role.module')
              .then(m => m.RoleModule)
        },
        {
          path: 'users',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./user/user.module')
              .then(m => m.UserModule)
        },
        {
          path: 'sessions',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./session/session.module')
              .then(m => m.SessionModule)
        },

        {
          path: 'device',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./device/device.module').then(
              m => m.DeviceModule
            )
        },
        {
          path: 'company-profile',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./company-profile/company-profile.module')
              .then(m => m.CompanyProfileModule)
        },
        {
          path: 'login-audit',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./login-audit/login-audit.module')
              .then(m => m.LoginAuditModule)
        },
        {
          path: 'logs',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./n-log/n-log.module')
              .then(m => m.NLogModule)
        },
        {
          path: 'notifications',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./notification/notification.module')
              .then(m => m.NotificationModule)
        },
        {
          path: 'my-profile',
          component: MyProfileComponent,
          data: { claimType: 'profile_personal_show_personal_profile' },
          canActivate: [AuthGuard]
        },
        {
          path: 'access-denied',
          component: AccessDeniedComponent
        },

        {
          path: 'module',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./claims-module/claims-module.module')
              .then(m => m.ClaimsModuleModule)
        },
        {
          path: 'page',
          loadChildren: () =>
            import('./page/page.module').then(
              m => m.PageModule
            )
        },
        {
          path: 'action',
          loadChildren: () =>
            import('./action/action.module').then(
              m => m.ActionModule
            )
        },
        {
          path: 'pageaction',
          loadChildren: () =>
            import('./page-action/page-action.module').then(
              m => m.PageActionModule
            )
        },
        {
          path: 'settings',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./settings/settings.module').then(
              m => m.SettingsModule
            )
        },
        {
          path: 'documents',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./document/document.module')
              .then(m => m.DocumentModule)
        },

        {
          path: '**',
          redirectTo: '/'
        }

//#region Unused routes
        // {
        //   path: 'emailtemplate',
        //   canLoad: [AuthGuard],
        //   loadChildren: () =>
        //     import('./email-template/email-template.module')
        //       .then(m => m.EmailTemplateModule)
        // },
        // {
        //   path: 'send-email',
        //   canLoad: [AuthGuard],
        //   loadChildren: () =>
        //     import('./email-send/email-send.module')
        //       .then(m => m.EmailSendModule)
        // },

        // {
        //   path: 'email-smtp',
        //   canLoad: [AuthGuard],
        //   loadChildren: () =>
        //     import('./email-smtp-setting/email-smtp-setting.module')
        //       .then(m => m.EmailSmtpSettingModule)
        // },
        // {
        //   path: 'inquiry',
        //   loadChildren: () =>
        //     import('./inquiry/inquiry.module').then(
        //       m => m.InquiryModule
        //     )
        // },
        // {
        //   path: 'supplier-chemical-relationship',
        //   loadChildren: () =>
        //     import('./supplier-chemical/supplier-chemical.module').then(
        //       m => m.SupplierChemicalModule
        //     )
        // },
        // {
        //   path: 'industry',
        //   loadChildren: () =>
        //     import('./industry/industry.module').then(
        //       m => m.IndustryModule
        //     )
        // },
        // {
        //   path: 'industry-chemical',
        //   loadChildren: () =>
        //     import('./industry-chemical/industry-chemical.module').then(
        //       m => m.IndustryChemicalModule
        //     )
        // },
        // {
        //   path: 'search',
        //   loadChildren: () =>
        //     import('./search-chemical-supplier/search-chemical-supplier.module').then(
        //       m => m.SearchChemicalSupplierModule
        //     )
        // },
        // {
        //   path: 'article',
        //   loadChildren: () =>
        //     import('./article/article.module').then(
        //       m => m.ArticleModule
        //     )
        // },
        //  {
        //   path: 'testimonial',
        //   loadChildren: () =>
        //     import('./testimonial/testimonial.module').then(
        //       m => m.TestimonialModule
        //     )
        // },
        // {
        //   path: 'customer-chemical-relationship',
        //   loadChildren: () =>
        //     import('./customer-chemical/customer-chemical.module').then(
        //       m => m.CustomerChemicalModule
        //     )
        // },
        // {
        //   path: 'contact-us',
        //   loadChildren: () =>
        //     import('./contact-us/contact-us.module').then(
        //       m => m.ContactUsModule
        //     )
        // },
        // {
        //   path: 'chemical-types',
        //   loadChildren: () =>
        //     import('./chemical-type/chemical-type.module').then(
        //       m => m.ChemicalTypeModule
        //     )
        // },
        // {
        //   path: 'my-documents',
        //   loadChildren: () =>
        //     import('./document-library/document-library.module')
        //       .then(m => m.DocumentLibraryModule)
        // },
        // {
        //   path: 'document-categories',
        //   loadChildren: () =>
        //     import('./document-category/document-category.module')
        //       .then(m => m.DocumentCategoryModule)
        // },
        // {
        //   path: 'documents',
        //   loadChildren: () =>
        //     import('./document/document.module')
        //       .then(m => m.DocumentModule)
        // },
        // {
        //   path: 'document-audit-trails',
        //   loadChildren: () =>
        //     import('./document-audit-trail/document-audit-trail.module')
        //       .then(m => m.DocumentAuditTrailModule)
        // },

        // {
        //   path: 'reminders',
        //   loadChildren: () => import('./reminder/reminder.module')
        //     .then(m => m.ReminderModule)
        // },
        // {
        //   path: 'purchase-order-request',
        //   loadChildren: () => import('./purchase-order-request/purchase-order-request.module')
        //     .then(m => m.PurchaseOrderRequestModule)
        // },



        // {
        //   path: 'delivery-method',
        //   loadChildren: () => import('./delivery-method/delivery-method.module')
        //     .then(m => m.DeliveryMethodModule)
        // }, {
        //   path: 'packaging-type',
        //   loadChildren: () => import('./packaging-type/packaging-type.module')
        //     .then(m => m.PackagingTypeModule)
        // },
        // {
        //   path: 'inquiry-status',
        //   loadChildren: () => import('./inquiry-status/inquiry-status.module')
        //     .then(m => m.InquiryStatusModule)
        // }, {
        //   path: 'inquiry-source',
        //   loadChildren: () => import('./inquiry-source/inquiry-source.module')
        //     .then(m => m.InquirySourceModule)
        // },
        // {
        //   path: 'payment-term',
        //   loadChildren: () => import('./payment-term/payment-term.module')
        //     .then(m => m.PaymentTermModule)
        // },

        // {
        //   path: 'expense-category',
        //   loadChildren: () => import('./expense-category/expense-category.module')
        //     .then(m => m.ExpenseCategoryModule)
        // },
        // {
        //   path: 'expense',
        //   loadChildren: () => import('./expense/expense.module')
        //     .then(m => m.ExpenseModule)
        // },


        // {
        //   path: 'expense-report',
        //   loadChildren: () =>
        //     import('./reports/expense-report/expense-report.module').then(
        //       m => m.ExpenseReportModule
        //     )
        // },


        // {
        //   path: 'sales-payment-report',
        //   loadChildren: () =>
        //     import('./reports/sales-payment-report/sales-payment-report.module').then(
        //       m => m.SalesPaymentReportModule
        //     )
        // },

        // {
        //   path: 'sales-purchase-report',
        //   loadChildren: () =>
        //     import('./reports/sales-purchase-report/sales-purchase-report.module').then(
        //       m => m.SalesPurchaseReportModule
        //     )
        // },

//#endregion


      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
