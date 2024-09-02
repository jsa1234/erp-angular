import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductCategory } from '@core/domain-classes/product-category';
import { BaseComponent } from 'src/app/base.component';
import { CategoryService } from 'src/app/category/category.service';
@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss']
})
export class CategoryDropdownComponent  extends BaseComponent implements OnInit {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  @Output() categoryUUID:EventEmitter<string> = new EventEmitter<string>()
  categories:ProductCategory[]
  @Input() isMandatory:boolean = false
  searchControl: FormControl = new FormControl('');
  categorieList: ProductCategory[];
  controlNameLabel: string;
  constructor(private categoryService:CategoryService) {
    super();
  }

  ngOnInit(): void {
    this.getActiveCategory()
    this.controlNameLabel = this.controlName.toString()

    this.searchControl.valueChanges.subscribe((searchTerm) => {
      // Update the filtered brands based on the search term
      this.categories = this.filterCategory(searchTerm);
    });
  }
  getActiveCategory(){
    this.sub$.sink = this.categoryService.getActiveCategories().subscribe((res: ProductCategory[]) => {
      this.categorieList = res;
      this.categories = this.filterCategory('');
    });
  }
  getCategoryId(a){
    this.categoryUUID.emit(a)
  }

  filterCategory(searchTerm: string): any[] {
    searchTerm = searchTerm.toLowerCase();
    if (!searchTerm) {
      // Return all brands when the search term is empty
      return this.categorieList;
    } else {
      // Filter by brand name containing the search term
      return this.categorieList.filter((category) =>
      category.nameEnglish.toLowerCase().includes(searchTerm) ||
      category.code.toLowerCase().includes(searchTerm)
      );
    }
  }
}
