import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'configEnabled'
})
export class ConfigEnabledPipe implements PipeTransform {
  transform(configurations: any[], label: string): boolean {
    const config = configurations.find(c => c.key.toLowerCase() === label.toLowerCase());
    return config ? config.value : false;
  }
}
