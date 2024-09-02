import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AddReminderSchedulerComponent } from './add-reminder-scheduler/add-reminder-scheduler.component';
import { BarcodeGeneratorDisplayComponent } from './barcode-generator-display/barcode-generator-display.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { ComapnyProfileHeadingComponent } from './components/comapny-profile-heading/comapny-profile-heading.component';
import { DashboardLoaderComponent } from './components/dashboard-loader/dashboard-loader.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DigitalClockComponent } from './components/digital-clock/digital-clock.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { SkeltonLoaderComponent } from './components/skelton-loader/skelton-loader.component';
import { SystemFlagConfigurationsComponent } from './components/system-flag-configurations/system-flag-configurations.component';
import { VatReportFilterComponent } from './components/vat-report-search-filter/vat-report-filter.component';
import { BranchDropdownComponent } from './custom-dropdowns/branch-dropdown/branch-dropdown.component';
import { BrandDropdownComponent } from './custom-dropdowns/brand-dropdown/brand-dropdown.component';
import { CategoryDropdownComponent } from './custom-dropdowns/category-dropdown/category-dropdown.component';
import { CustomerDropdownComponent } from './custom-dropdowns/customer-dropdown/customer-dropdown.component';
import { DeviceDropdownComponent } from './custom-dropdowns/device-dropdown/device-dropdown.component';
import { ProductDropdownComponent } from './custom-dropdowns/product-dropdown/product-dropdown.component';
import { SubcategoryDropdownComponent } from './custom-dropdowns/subcategory-dropdown/subcategory-dropdown.component';
import { SupplierDropdownComponent } from './custom-dropdowns/supplier-dropdown/supplier-dropdown.component';
import { TransactionModeDropdownComponent } from './custom-dropdowns/transaction-mode-dropdown/transaction-mode-dropdown.component';
import { DecimalOnlyDirective } from './directives/decimal-only.directive';
import { DragDropDirective } from './directives/drag-drop.directive';
import { NumericOnlyDirective } from './directives/number-only.directive';
import { DocumentViewComponent } from './document-view/document-view.component';
import { HasClaimDirective } from './has-claim.directive';
import { CustomDateAdapter, PICK_FORMATS } from './helpers/custom-date-adapter';
import { JournalPdfComponent } from './pdf-templates/Accounts/journal-pdf/journal-pdf.component';
import { ReceiptPdfComponent } from './pdf-templates/Accounts/receipt-pdf/receipt-pdf.component';
import { VoucherPdfComponent } from './pdf-templates/Accounts/voucher-pdf/voucher-pdf.component';
import { DailyActivityReportPdfComponent } from './pdf-templates/daily-activity-report-pdf/daily-activity-report-pdf.component';
import { PurchaseInvoicePdfComponent } from './pdf-templates/invoices-pdf/purchase-invoice-pdf/purchase-invoice-pdf.component';
import { PurchaseReturnPdfComponent } from './pdf-templates/invoices-pdf/purchase-return-pdf/purchase-return-pdf.component';
import { ReturnDetailedComponent } from './pdf-templates/invoices-pdf/sale-return-pdf/return-detailed/return-detailed.component';
import { ReturnSimplifiedComponent } from './pdf-templates/invoices-pdf/sale-return-pdf/return-simplified/return-simplified.component';
import { DetailedComponent } from './pdf-templates/invoices-pdf/sales-invoice-pdf/detailed/detailed.component';
import { SimplifiedComponent } from './pdf-templates/invoices-pdf/sales-invoice-pdf/simplified/simplified.component';
import { BillWiseReportPdfComponent } from './pdf-templates/purchase-reports-pdf/bill-wise-report-pdf/bill-wise-report-pdf.component';
import { DetailedReportPdfComponent } from './pdf-templates/purchase-reports-pdf/detailed-report-pdf/detailed-report-pdf.component';
import { ProductWiseReportPdfComponent } from './pdf-templates/purchase-reports-pdf/product-wise-report-pdf/product-wise-report-pdf.component';
import { SupplierWiseReportPdfComponent } from './pdf-templates/purchase-reports-pdf/supplier-wise-report-pdf/supplier-wise-report-pdf.component';
import { BillWisePurchaseReturnReportPdfComponent } from './pdf-templates/purchase-return-report-pdf/bill-wise-purchase-return-report-pdf/bill-wise-purchase-return-report-pdf.component';
import { DetailedPurchaseReturnReportPdfComponent } from './pdf-templates/purchase-return-report-pdf/detailed-purchase-return-report-pdf/detailed-purchase-return-report-pdf.component';
import { BillWiseSaleReturnReportPdfComponent } from './pdf-templates/sale-return-report-pdf/bill-wise-sale-return-report-pdf/bill-wise-sale-return-report-pdf.component';
import { DetailedSaleReturnReportPdfComponent } from './pdf-templates/sale-return-report-pdf/detailed-sale-return-report-pdf/detailed-sale-return-report-pdf.component';
import { BillWiseSalesReportPdfComponent } from './pdf-templates/sales-reports-pdf/bill-wise-sales-report-pdf/bill-wise-sales-report-pdf.component';
import { CustomerWiseSalesReportPdfComponent } from './pdf-templates/sales-reports-pdf/customer-wise-sales-report-pdf/customer-wise-sales-report-pdf.component';
import { DetailedSalesReportPdfComponent } from './pdf-templates/sales-reports-pdf/detailed-sales-report-pdf/detailed-sales-report-pdf.component';
import { ProductWiseSalesReportPdfComponent } from './pdf-templates/sales-reports-pdf/product-wise-sales-report-pdf/product-wise-sales-report-pdf.component';
import { StatementOfAccountPdfComponent } from './pdf-templates/statement-of-account-pdf/statement-of-account-pdf.component';
import { GeneralStockReportPdfComponent } from './pdf-templates/stock-report/general-stock-report-pdf/general-stock-report-pdf.component';
import { ProductWiseStockReportPdfComponent } from './pdf-templates/stock-report/product-wise-stock-report-pdf/product-wise-stock-report-pdf.component';
import { InputMonthlyPdfComponent } from './pdf-templates/vat-report-pdf/detailed/input-monthly-pdf/input-monthly-pdf.component';
import { InputYearlyQuarterlyPdfComponent } from './pdf-templates/vat-report-pdf/detailed/input-yearly-quarterly-pdf/input-yearly-quarterly-pdf.component';
import { OutputMonthlyPdfComponent } from './pdf-templates/vat-report-pdf/detailed/output-monthly-pdf/output-monthly-pdf.component';
import { OutputYearlyQuarterlyPdfComponent } from './pdf-templates/vat-report-pdf/detailed/output-yearly-quarterly-pdf/output-yearly-quarterly-pdf.component';
import { SummaryGstPdfComponent } from './pdf-templates/vat-report-pdf/summary/summary-gst-pdf/summary-gst-pdf.component';
import { SummaryMonthlyPdfComponent } from './pdf-templates/vat-report-pdf/summary/summary-monthly-pdf/summary-monthly-pdf.component';
import { SummaryYearlyQuarterlyPdfComponent } from './pdf-templates/vat-report-pdf/summary/summary-yearly-quarterly-pdf/summary-yearly-quarterly-pdf.component';
import { PipesModule } from './pipes/pipes.module';
import { QuantitiesUnitPriceTaxPipe } from './pipes/quantities-unitprice-tax.pipe';
import { QuantitiesUnitPricePipe } from './pipes/quantities-unitprice.pipe';
import { PosMerchantAccountDevicesComponent } from './components/pos-merchant-account-devices/pos-merchant-account-devices.component';
import { PosPrinterDetailDialogComponent } from './components/pos-printer-detail-dialog/pos-printer-detail-dialog.component';
import { UserDropdownComponent } from './custom-dropdowns/user-dropdown/user-dropdown.component';
import { OrderStatusDirective } from './directives/order-status.directive';
import { BarcodeProductModalComponent } from './components/barcode-product-modal/barcode-product-modal.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  exports: [
    HasClaimDirective,
    PipesModule,
    TranslateModule,
    DragDropDirective,
    DocumentViewComponent,
    OverlayModule,
    QuantitiesUnitPricePipe,
    QuantitiesUnitPriceTaxPipe,
    BranchDropdownComponent,
    DeviceDropdownComponent,
    CategoryDropdownComponent,
    SubcategoryDropdownComponent,
    BrandDropdownComponent,
    ProductDropdownComponent,
    SupplierDropdownComponent,
    TransactionModeDropdownComponent,
    ProductWiseReportPdfComponent,
    BillWiseReportPdfComponent,
    SupplierWiseReportPdfComponent,
    DetailedReportPdfComponent,
    ProductWiseSalesReportPdfComponent,
    DetailedSalesReportPdfComponent,
    CustomerWiseSalesReportPdfComponent,
    BillWiseSalesReportPdfComponent,
    CustomerDropdownComponent,
    JournalPdfComponent,
    ReceiptPdfComponent,
    VoucherPdfComponent,
    PurchaseInvoicePdfComponent,
    SimplifiedComponent,
    DetailedComponent,
    PurchaseReturnPdfComponent,
    DailyActivityReportPdfComponent,
    StatementOfAccountPdfComponent,
    GeneralStockReportPdfComponent,
    ProductWiseStockReportPdfComponent,
    DecimalOnlyDirective,
    NumericOnlyDirective,
    VatReportFilterComponent,
    SummaryMonthlyPdfComponent,
    SummaryYearlyQuarterlyPdfComponent,
    InputYearlyQuarterlyPdfComponent,
    OutputYearlyQuarterlyPdfComponent,
    InputMonthlyPdfComponent,
    OutputMonthlyPdfComponent,
    ComapnyProfileHeadingComponent,
    DashboardLoaderComponent,
    SkeltonLoaderComponent,
    ReturnSimplifiedComponent,
    ReturnDetailedComponent,
    DigitalClockComponent,
    DateInputComponent,
    BarcodeGeneratorDisplayComponent,
    CheckBoxComponent,
    SummaryGstPdfComponent,
    BillWisePurchaseReturnReportPdfComponent,
    DetailedPurchaseReturnReportPdfComponent,
    BillWiseSaleReturnReportPdfComponent,
    DetailedSaleReturnReportPdfComponent,
    SystemFlagConfigurationsComponent,
    PosMerchantAccountDevicesComponent,
    PosPrinterDetailDialogComponent,
    UserDropdownComponent,
    OrderStatusDirective,
    BarcodeProductModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    OverlayModule,
    NgxDocViewerModule,
    NgxExtendedPdfViewerModule,
    MatIconModule,
    TranslateModule,
    MatDialogModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    QRCodeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ],
  declarations: [
    HasClaimDirective,
    DragDropDirective,
    DocumentViewComponent,
    AddReminderSchedulerComponent,
    QuantitiesUnitPricePipe,
    QuantitiesUnitPriceTaxPipe,
    BranchDropdownComponent,
    DeviceDropdownComponent,
    CategoryDropdownComponent,
    SubcategoryDropdownComponent,
    BrandDropdownComponent,
    ProductDropdownComponent,
    SupplierDropdownComponent,
    TransactionModeDropdownComponent,
    ProductWiseReportPdfComponent,
    BillWiseReportPdfComponent,
    SupplierWiseReportPdfComponent,
    DetailedReportPdfComponent,
    ProductWiseSalesReportPdfComponent,
    DetailedSalesReportPdfComponent,
    CustomerWiseSalesReportPdfComponent,
    BillWiseSalesReportPdfComponent,
    CustomerDropdownComponent,
    ReceiptPdfComponent,
    JournalPdfComponent,
    VoucherPdfComponent,
    PurchaseInvoicePdfComponent,
    SimplifiedComponent,
    DetailedComponent,
    PurchaseReturnPdfComponent,
    DailyActivityReportPdfComponent,
    StatementOfAccountPdfComponent,
    GeneralStockReportPdfComponent,
    ProductWiseStockReportPdfComponent,
    DecimalOnlyDirective,
    NumericOnlyDirective,
    VatReportFilterComponent,
    SummaryMonthlyPdfComponent,
    SummaryYearlyQuarterlyPdfComponent,
    ComapnyProfileHeadingComponent,
    InputYearlyQuarterlyPdfComponent,
    OutputYearlyQuarterlyPdfComponent,
    InputMonthlyPdfComponent,
    OutputMonthlyPdfComponent,
    DateInputComponent,
    DashboardLoaderComponent,
    SkeltonLoaderComponent,
    ReturnSimplifiedComponent,
    ReturnDetailedComponent,
    DigitalClockComponent,
    BarcodeGeneratorDisplayComponent,
    ProductModalComponent,
    CheckBoxComponent,
    SummaryGstPdfComponent,
    BillWisePurchaseReturnReportPdfComponent,
    DetailedPurchaseReturnReportPdfComponent,
    BillWiseSaleReturnReportPdfComponent,
    DetailedSaleReturnReportPdfComponent,
    SystemFlagConfigurationsComponent,
    PosMerchantAccountDevicesComponent,
    PosPrinterDetailDialogComponent,
    UserDropdownComponent,
    OrderStatusDirective,
    BarcodeProductModalComponent
      ],
  providers:[
    {provide: DateAdapter, useClass: CustomDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class SharedModule { }
