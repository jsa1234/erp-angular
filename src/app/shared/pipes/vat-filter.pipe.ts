import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatFilter'
})
export class VatFilterPipe implements PipeTransform {

  transform(items: any[], taxSlab: any, type: string): any {
    let data = items?.filter(res => res.slab == taxSlab);
    if (data && data.length > 0) {
      if (type === 'taxableAmount') return data[0].taxableAmount; 
      else 
        if (type === 'taxAmount') return data[0].taxAmount;
      else
        if(type === 'totalTaxableAmount') return data[0].totalTaxableAmount;
      else
        if(type === 'totalTaxAmount') return data[0].totalTaxAmount;
    }
    return 0;
  }

}
