import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { UnitService } from '../unit.service';
import { UnitListPresentationComponent } from '../unit-list-presentation/unit-list-presentation.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent extends BaseComponent implements OnInit {
  @ViewChild(UnitListPresentationComponent) unitListPresentationComponent: UnitListPresentationComponent;

  constructor(
    private unitService: UnitService,
    private toastrService: ToastrService) {
      super();
  }
  ngOnInit(): void {  }


  deleteUnit(id: string): void {
    this.sub$.sink = this.unitService.delete(id).subscribe((res:any) => {
      this.unitListPresentationComponent.loadData()
      this.toastrService.success('UNIT_DELETED_SUCCESSFULLY');
    });
  }

}
