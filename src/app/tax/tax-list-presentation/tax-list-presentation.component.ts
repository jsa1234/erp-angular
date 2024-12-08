import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Tax } from '@core/domain-classes/tax';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageTaxComponent } from '../manage-tax/manage-tax.component';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-tax-list-presentation',
  templateUrl: './tax-list-presentation.component.html',
  styleUrls: ['./tax-list-presentation.component.scss'],
})
export class TaxListPresentationComponent
  extends BaseComponent
  implements OnInit
{
  @Input() taxes: Tax[];
  @Input() loading: boolean = false;
  @Output() deleteTaxHandler: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = [
   
    'taxType',
    //'taxBehaviour',
    'code',
    'nameEnglish',
    // 'nameSecondLanguage',
    'percentage',
    'cgst',
    'sgst',
    'igst',
    'status',
    'action',
  ];
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private branchService: BranchService
  ) {
    super();
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
  }

  deleteTax(tax: Tax): void {
    const taxName =
      this.translationService.getSelectedLanguage() == 'en'
        ? tax.nameEnglish
        : tax.nameSecondLanguage;
    const areU = this.translationService.getValue(
      'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
    );
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${areU} :: ${taxName}`)
      .subscribe((isTrue) => {
        if (isTrue) {
          this.deleteTaxHandler.emit(tax.taxUUID);
        }
      });
  }

  manageTax(tax: Tax): void {
    this.dialog.open(ManageTaxComponent, {
      width: '50%',
      data: Object.assign({}, tax),
    });
  }
}
