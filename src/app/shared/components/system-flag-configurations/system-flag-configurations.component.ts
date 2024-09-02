import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { ControlType } from '@core/domain-classes/enums/control-type.enum';

@Component({
  selector: 'app-system-flag-configurations',
  templateUrl: './system-flag-configurations.component.html',
  styleUrls: ['./system-flag-configurations.component.scss']
})
export class SystemFlagConfigurationsComponent implements OnInit {

  @Input() systemFlagConfigurations:SystemFlagConfiguration[]
  @Output() saveConfig = new EventEmitter<SystemFlagConfiguration[]>(); 
  companyConfigurations: SystemFlagConfiguration[];
  controlType = ControlType
  constructor() { }

  ngOnInit(): void {
    this.companyConfigurations = this.systemFlagConfigurations
  }
  onToggleChange(config: SystemFlagConfiguration): void {
    config.value = config.value === 'TRUE' ? 'FALSE' : 'TRUE';
  }
  save(): void {
    this.saveConfig.emit(this.companyConfigurations);
  }

}
