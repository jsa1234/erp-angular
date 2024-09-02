import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { DistrictService } from '../district.service';
import { DistrictListPresentationComponent } from '../district-list-presentation/district-list-presentation.component';
@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent extends BaseComponent implements OnInit {
  @ViewChild(DistrictListPresentationComponent) districtListPresentationComponent:DistrictListPresentationComponent
  constructor(
    private districtService:DistrictService,
    private toastrService:ToastrService,
    private translationService:TranslationService
  ) {
    super()
   }

  ngOnInit(): void {}



  deleteDistrict(id: string): void {
    this.sub$.sink = this.districtService.delete(id).subscribe(() => {
      this.districtListPresentationComponent.loadData()
      this.toastrService.success('District deleted Successfully');
    });
  }

}
