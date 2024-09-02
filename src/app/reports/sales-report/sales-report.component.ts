
import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent extends BaseComponent implements OnInit {
  isLoading$: boolean=false;

  constructor(
    public translationService: TranslationService,
    private loader:LoaderService
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

