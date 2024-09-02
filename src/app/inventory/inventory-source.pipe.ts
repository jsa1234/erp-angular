import { Pipe, PipeTransform } from '@angular/core';
import { inventorySource } from '@core/domain-classes/inventory/inventory-source';

@Pipe({
  name: 'inventorySource'
})

export class InventorySourcePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const reminderFrequency = inventorySource.find(c => c.id == value);
    if (reminderFrequency) {
      return reminderFrequency.name;
    }
    return '';
  }
}
