import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubcategoryResourceParameter } from '@core/domain-classes/masters/subcategory-resource-parameter';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { BaseComponent } from 'src/app/base.component';
import { SubCategoryService } from 'src/app/sub-category/sub-category.service';

@Component({
  selector: 'app-subcategory-dropdown',
  templateUrl: './subcategory-dropdown.component.html',
  styleUrls: ['./subcategory-dropdown.component.scss']
})
export class SubcategoryDropdownComponent  extends BaseComponent implements OnInit,OnChanges {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  @Input() id:string 
  subcategories:ProductSubcategory[]
  subcategoriesList:ProductSubcategory[]
  @Input() isMandatory:boolean = false
  @Output() subcategoryUUID:EventEmitter<string> = new EventEmitter<string>()
  isShowAll:boolean
  searchControl: FormControl = new FormControl('');
  controlNameLabel: string;

  constructor(private subcategoryService:SubCategoryService) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['id']){
     this.getActiveSubcategory()

   }
  }


  ngOnInit(): void {

    this.controlNameLabel = this.controlName.toString()

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.subcategories = this.filterProduct(searchTerm);
    });
  }


  getActiveSubcategory(){
    if(!this.id){return}

    let params = new SubcategoryResourceParameter()
    params.categoryUUID = this.id
    params.isActive = true
    this.sub$.sink = this.subcategoryService.getProductSubCategorybyCategory(params).subscribe((res: ProductSubcategory[]) => {
      this.subcategoriesList = res;
      this.subcategories = this.filterProduct('');

    });
  }

  getSubcategoryId(a){
    this.subcategoryUUID.emit(a)
  }


  filterProduct(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.subcategoriesList;
    } else {
      // Filter by brand name containing the search term
      return this.subcategoriesList.filter((item) =>
      item.nameEnglish.toLowerCase().includes(searchTerm) 
      );
    }
  }
}
