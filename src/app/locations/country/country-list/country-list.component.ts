import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { tap } from 'rxjs/operators';
import { CountryService } from '../country.service';
import { CountryListPresentationComponent } from '../country-list-presentation/country-list-presentation.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends BaseComponent implements OnInit {
  @ViewChild(CountryListPresentationComponent) countryListPresentationComponent:CountryListPresentationComponent
  constructor(
    private countryService:CountryService,
    private toastrService:ToastrService,
    private translationService:TranslationService
  ) { 
    super()
  }

  ngOnInit(): void {}


  deleteCountry(id: string): void {
    this.sub$.sink = this.countryService.delete(id).subscribe(() => {
      this.countryListPresentationComponent.loadData()
      this.toastrService.success('Country deleted Successfully');
    });
  }
}
