import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { BaseComponent } from 'src/app/base.component';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-sale-return-report',
  templateUrl: './sale-return-report.component.html',
  styleUrls: ['./sale-return-report.component.scss']
})
export class SaleReturnReportComponent extends BaseComponent implements OnInit {
  isLoading$:boolean
  constructor(public translationService:TranslationService, private loader:LoaderService,
              private branchService:BranchService
  ) { 
    super()
  }
  ngOnInit(): void { 
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide()

   }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
}
