import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
// import { IDevice } from '@core/domain-classes/device';
import { BaseComponent } from 'src/app/base.component';
// import { DeviceService } from 'src/app/device/device.service';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss'],

})
export class PurchaseReportComponent extends BaseComponent implements OnInit {
  isLoading$: boolean=false;
 
  constructor(
    public translationService: TranslationService, private loader:LoaderService
    ) {
    super();
  }

  ngOnInit(): void {
    this.loaderShowOrHide()
  }


  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}


