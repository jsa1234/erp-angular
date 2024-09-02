import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from '@core/domain-classes/brand';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { BrandService } from '../brand.service';
import { BrandListPresentationComponent } from '../brand-list-presentation/brand-list-presentation.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent extends BaseComponent implements OnInit {
  @ViewChild(BrandListPresentationComponent) brandListPresentationComponent: BrandListPresentationComponent;

  constructor(
    private brandService:BrandService,
    private toasterService:ToastrService,
    private translationService:TranslationService
  ) {
    super();
  }

  ngOnInit(): void {}

  deleteBrand(id: string): void {
    this.sub$.sink = this.brandService.delete(id).subscribe(() => {
      this.brandListPresentationComponent.loadData()
      this.toasterService.success('Brand deleted Successfully');
    });
  }
}
