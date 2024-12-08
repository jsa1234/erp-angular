import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Action } from '@core/domain-classes/action';
import { Page } from '@core/domain-classes/page';
import { PageAction } from '@core/domain-classes/page-action';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-page-action-presentation',
  templateUrl: './manage-page-action-presentation.component.html',
  styleUrls: ['./manage-page-action-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagePageActionPresentationComponent extends BaseComponent implements OnInit {
searchQuery:string=''
  @Input() pages: Page[];
  @Input() actions: Action[];
  @Input() pageActions: PageAction[];
  @Input() loading: boolean;
  @Input() loadingPage: boolean;
  @Input() loadingAction: boolean;
  pageActionForm: FormGroup;

  @Output() addPageAction: EventEmitter<PageAction> = new EventEmitter<PageAction>();
  @Output() deletePageAction: EventEmitter<PageAction> = new EventEmitter<PageAction>();


  get pageActionArray(): FormArray {
    return <FormArray>this.pageActionForm.get('pageActionArray');
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createPageActionForm();
  }

  createPageActionForm() {
    this.pageActionForm = this.fb.group({
      pageActionArray: this.fb.array([])
    });
  }

  onCheck(pageId: string, actionId: string): boolean {
    const pageAction = this.pageActions.find(c => c.pageId === pageId && c.actionId === actionId);
    if (pageAction) {
      return true;
    } else {
      return false;
    }
  }

  patchPageActionForm() {
    this.pages.forEach(page => {
      this.actions.forEach(action => {
        const pageAction = this.pageActions.find(c => c.pageId === page.id && c.actionId === action.id);
        let id = null;
        if (pageAction) {
          id = pageAction.id;
        }

        this.pageActionArray.push(
          this.fb.group({
            id: [id],
            pageId: [page.id],
            pageName: [page.name],
            url: [page.url],
            actionId: [action.id],
            actionName: [action.name],
            flag: id ? true : false
          })
        )
      })
    })
  }

  onPageActionChange(flag: MatSlideToggleChange, pageId: string, actionId: string) {
    if (flag.checked) {
      const pageAction: PageAction = {
        pageId: pageId,
        actionId: actionId
      }
      this.addPageAction.emit(pageAction);
    } else {
      const pageAction = this.pageActions.find(c => c.actionId === actionId && c.pageId === pageId);
      if (pageAction) {
        this.deletePageAction.emit(pageAction);
      }
    }
  }
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageSearch'
})
export class PageSearchPipe implements PipeTransform {
  transform(pages: Page[], searchQuery: string): Page[] {
    if (!searchQuery) {
      return pages;
    }

    searchQuery = searchQuery.toLowerCase();
    return pages.filter(page => page.name.toLowerCase().includes(searchQuery));
  }
}

