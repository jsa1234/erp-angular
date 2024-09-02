import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpeningStock } from '@core/domain-classes/opening-stock';
import { OpeningStockResourceParameter } from '@core/domain-classes/opening-stock-resourceparameter';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-opening-stock',
  templateUrl: './opening-stock.component.html',
  styleUrls: ['./opening-stock.component.scss'],
})
export class OpeningStockComponent extends BaseComponent implements OnInit {
  openingStocks: OpeningStock[] = [];
  searchForm:FormGroup
  isLoading$:boolean
  openingStockResource:OpeningStockResourceParameter
  constructor(
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private loader:LoaderService,
    private fb:FormBuilder
  ) {
    super();
    this.openingStockResource = new OpeningStockResourceParameter();
  }


  ngOnInit(): void {
    this.loaderShowOrHide()
    this.createSearchForm()
   
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  getOpeningStocks() {
    if(this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
    const {branch} = this.searchForm.getRawValue()
    this.openingStockResource.branch = branch
    this.openingStocks = []

    this.sub$.sink = this.inventoryService.getOpeningStocks(this.openingStockResource).subscribe((res: OpeningStock[]) => {
      for(let i = 0; i <res.length;i++){
        let ops = new OpeningStock(res[i])
        this.openingStocks.push(ops)
        this.loader.hide()
      }
    },
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
    })
  }
  updateOpeningStock(){
    this.loader.show()
    this.sub$.sink  = this.inventoryService.updateOpeningStocks(this.openingStocks, this.openingStockResource.branch).subscribe((res:OpeningStock)=>{
      this.toastrService.success('Opening Stock Updated successfully')
      this.clear()
      this.loader.hide()
    },
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
      this.loader.hide()
    })
  }
  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:['',Validators.required]
    })
  }

  clear(){
    this.searchForm.reset();
    this.openingStocks = []
    this.openingStockResource = new OpeningStockResourceParameter()
  }
}
