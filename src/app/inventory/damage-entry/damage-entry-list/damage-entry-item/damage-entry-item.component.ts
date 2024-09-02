import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { IDamageEntryDetail } from '@core/domain-classes/damage-entry-details.interface';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DamageEntryService } from '../../damage-entry.service';
import { FormatDamageEntry } from '../../manage-damage-entry/format-Damage-entry.class';

@Component({
  selector: 'app-damage-entry-item',
  templateUrl: './damage-entry-item.component.html',
  styleUrls: ['./damage-entry-item.component.scss']
})
export class DamageEntryItemComponent extends BaseComponent implements OnInit,OnChanges {
@Input() damagEntryId:string
damageEntryItems:IDamageEntryDetail[] = []
isLoading:boolean = false;
  constructor(public translate:TranslationService,private damageService: DamageEntryService,) {
    super();
  }
  displayedColumns: string[] = ['slNo', 'productCode','productName','barcode','stock',  'damageQuantity',  'avgRate', 'unit','decription','total'];


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['damagEntryId']) {
      this.getDamageDetailsItems();
    }
  }


  getDamageDetailsItems() {
    this.isLoading = true;
    this.damageService.getDamageItems(this.damagEntryId)
    .subscribe((data: IDamageEntryDetail[]) => {
      this.isLoading = false;
      this.damageEntryItems = data
      console.log(this.damageEntryItems)
    }, () => this.isLoading = false)
  }

}
