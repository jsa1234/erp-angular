import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentCategory } from '@core/domain-classes/document-category';
import { DocumentAuditTrail } from '@core/domain-classes/document-audit-trail';
import { ResponseHeader } from '@core/domain-classes/document-header';
import { DocumentResource } from '@core/domain-classes/document-resource';
import { User } from '@core/domain-classes/user';
import { CommonError } from '@core/error-handler/common-error';
import { DocumentCategoryService } from '@core/services/document-category.service';
import { CommonService } from '@core/services/common.service';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { DocumentAuditTrialDataSource } from './document-audit-trail-datassource';
import { DocumentAuditTrailService } from './document-audit-trail.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-document-audit-trail',
  templateUrl: './document-audit-trail.component.html',
  styleUrls: ['./document-audit-trail.component.scss']
})
export class DocumentAuditTrailComponent extends BaseComponent implements OnInit, AfterViewInit {
  dataSource: DocumentAuditTrialDataSource;
  documentAuditTrails: DocumentAuditTrail[] = [];
  displayedColumns: string[] = ['createdDate','documentName', 'categoryName','operationName','createdBy','permissionUser','permissionRole'];
  isLoadingResults = true;
  documentResource: DocumentResource;
  categories: DocumentCategory[] = [];
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  users: User[] = [];

  constructor(
    private documentAuditTrailService: DocumentAuditTrailService,
    private categoryService: DocumentCategoryService,
    private commonService: CommonService
  ) {
    super();
    this.documentResource = new DocumentResource();
    this.documentResource.pageSize = 10;
    this.documentResource.orderBy = "createdDate desc";
  }

  ngOnInit(): void {
    this.dataSource = new DocumentAuditTrialDataSource(this.documentAuditTrailService);
    this.dataSource.loadDocumentAuditTrails(this.documentResource);
    this.sub$.sink = this.categoryService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.getCategories();
          }
        })
      ).subscribe();
    this.sub$.sink = this.categoryService.entities$
      .subscribe(c => {
        this.categories = [...c];
      });
    this.getResourceParameter();
    this.getUsers();
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.documentResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.documentResource.pageSize = this.paginator.pageSize;
          this.documentResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadDocumentAuditTrails(this.documentResource);
        })
      )
      .subscribe();

    // this.sub$.sink = fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.documentResource.name = this.input.nativeElement.value;
    //       this.dataSource.loadDocumentAuditTrails(this.documentResource);
    //     })
    //   )
    //   .subscribe();
  }

  onCategoryChange(filtervalue: any) {
    if (filtervalue.value) {
      this.documentResource.categoryId = filtervalue.value;
    } else {
      this.documentResource.categoryId = '';
    }
    this.documentResource.skip = 0;
    this.dataSource.loadDocumentAuditTrails(this.documentResource);
  }

  onUserChange(filterValue: any) {
    if (filterValue.value) {
      this.documentResource.createdBy = filterValue.value;
    } else {
      this.documentResource.createdBy = '';
    }
    this.documentResource.skip = 0;
    this.dataSource.loadDocumentAuditTrails(this.documentResource);
  }

  getCategories(): void {
    this.categoryService.getAll();
  }

  getUsers(): void {
    this.sub$.sink = this.commonService.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      }, (err: CommonError) => {
        err.messages.forEach(() => {
          // this.toastrService.error(msg);
        });
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.documentResource.pageSize = c.pageSize;
          this.documentResource.skip = c.skip;
          this.documentResource.totalCount = c.totalCount;
        }
      });
  }

}
