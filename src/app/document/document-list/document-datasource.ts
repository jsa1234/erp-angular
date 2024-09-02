import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/document-header';
import { IDocument } from '@core/domain-classes/document-info';
import { DocumentResource } from '@core/domain-classes/document-resource';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DocumentService } from '../document.service';

export class DocumentDataSource implements DataSource<IDocument> {

  private documentsSubject = new BehaviorSubject<IDocument[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();


  constructor(private documentService: DocumentService) { }

  connect(collectionViewer: CollectionViewer): Observable<IDocument[]> {
    return this.documentsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.documentsSubject.complete();
    this.loadingSubject.complete();
  }

  loadDocuments() {

    this.loadingSubject.next(true);

    this.documentService.getDocumentNumbersList().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(
      (resp: HttpResponse<IDocument[]>) => {
        const data = [...resp.body];
        this.documentsSubject.next(data);
      }

    );
  }
}
