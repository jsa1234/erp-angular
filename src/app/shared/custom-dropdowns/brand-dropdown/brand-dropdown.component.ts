import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Brand } from '@core/domain-classes/brand';
import { QueryParams } from '@ngrx/data';
import { BaseComponent } from 'src/app/base.component';
import { BrandService } from 'src/app/brand/brand.service';

@Component({
  selector: 'app-brand-dropdown',
  templateUrl: './brand-dropdown.component.html',
  styleUrls: ['./brand-dropdown.component.scss']
})
export class BrandDropdownComponent  extends BaseComponent implements OnInit {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  brands:Brand[]
  @Output() brandUUID:EventEmitter<string> = new EventEmitter<string>()
  searchControl: FormControl = new FormControl('');
  isActive: QueryParams = { isActive: '1' };
  brandsList: Brand[];
  @Input() isMandatory:boolean = false

  constructor(private brandService:BrandService) {
    super();
  }

  ngOnInit(): void {
    this.getActiveBrand()
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.brands = this.filterBrands(searchTerm);
    });
  }
  filterBrands(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.brandsList;
    } else {
      // Filter by brand name containing the search term
      return this.brandsList.filter((brand) =>
        brand.nameEnglish.toLowerCase().includes(searchTerm) ||
        brand.code.toLowerCase().includes(searchTerm) 
      );
    }
  }
  

  getActiveBrand(){
    this.sub$.sink =  this.brandService.getActiveBrands().subscribe((res: Brand[]) => {
      this.brandsList = res
      this.brands = this.filterBrands('');
    });
  }
    getBrandId(a){
    this.brandUUID.emit(a)

  }

}
