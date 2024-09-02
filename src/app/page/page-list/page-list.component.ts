import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Page } from '@core/domain-classes/page';
import { BaseComponent } from 'src/app/base.component';
import { PageService } from '@core/services/page.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslationService } from '@core/services/translation.service';
import { Module } from '@core/domain-classes/module';
import { ModuleService } from '@core/services/modules.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent extends BaseComponent implements OnInit {
  pages$: Observable<Page[]>;
  displayedColumns: string[] = ['action', 'name'];
  loading$: Observable<boolean>;
  moduleList: Module[];

  constructor(
    private pageService: PageService,
    private toastrService: ToastrService,
    private moduleService:ModuleService,
    private translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.getModules()
    this.loading$ = this.pageService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getPages();
          }
        })
      );

    this.pages$ = this.pageService.entities$
  }

  deletePage(pageId: number) {
    this.sub$.sink = this.pageService.delete(pageId).subscribe(() => {
      this.toastrService.success(this.translationService.getValue('PAGE_DELETED_SUCCESSFULLY'));
    })
  }

  getPages(): void {
    this.pageService.getAll()
  }
  getModules():void{
    this.moduleService.getAll().subscribe((res:Module[])=>{
      this.moduleList = res
    })
  }
}
