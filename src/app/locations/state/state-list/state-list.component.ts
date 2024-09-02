import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { StateService } from '../state.service';
import { StateListPresentationComponent } from '../state-list-presentation/state-list-presentation.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent extends BaseComponent implements OnInit {
 @ViewChild(StateListPresentationComponent) StateListPresentationComponent:StateListPresentationComponent
  
  constructor(
    private stateService:StateService,
    private toastrService:ToastrService,
    private translationService:TranslationService
  ) {
    super()
   }

  ngOnInit(): void {}


  deleteState(id: string): void {
    this.sub$.sink = this.stateService.delete(id).subscribe(() => {
      this.StateListPresentationComponent.loadData()
      this.toastrService.success('State deleted Successfully');
    });
  }


}
