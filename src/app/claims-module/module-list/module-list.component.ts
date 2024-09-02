import { Component, OnInit } from '@angular/core';
import { Module } from '@core/domain-classes/module';
import { ModuleService } from '@core/services/modules.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent extends BaseComponent implements OnInit {
  modules$: Observable<Module[]>;
  loading$: Observable<boolean>;
  constructor(
    private moduleService: ModuleService,
    private toastrService: ToastrService) {
      super()
     }

  ngOnInit(): void {
    
    this.loading$ = this.moduleService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getModules();
          }
        })
      )
    this.modules$ = this.moduleService.entities$
  }

  getModules(): void {
    this.moduleService.getAll();
  }

  deleteModule(id: string): void {
    this.sub$.sink = this.moduleService.delete(id).subscribe(() => {
      this.toastrService.success(`Module Deleted Successfully.`);
    });
  }

  manageModule(module: Module): void {
    if (module.id) {
      this.sub$.sink = this.moduleService.update(module).subscribe(() => {
        this.toastrService.success(`Module Updated Successfully.`);
      });
    } else {
      this.sub$.sink = this.moduleService.add(module).subscribe(() => {
        this.toastrService.success(`Module Saved Successfully.`);
      });
    }

  }
}
