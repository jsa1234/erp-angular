import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDocument } from '@core/domain-classes/document-info';
import { OverlayPanel } from '@shared/overlay-panel/overlay-panel.service';
import { BaseComponent } from 'src/app/base.component';
import { DocumentEditComponent } from '../document-edit/document-edit.component';
import { DocumentService } from '../document.service';
import { DocumentDataSource } from './document-datasource';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent extends BaseComponent implements OnInit {
  dataSource: DocumentDataSource;
  documents: IDocument[] = [];
  displayedColumns: string[] = ['action','documentName', 'docPrefix', 'deviceCode','lastDocNo',   'consolidatedDocumentNo'];
  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog,
    public overlay: OverlayPanel,
  ) {
    super();

  }

  ngOnInit(): void {
    this.dataSource = new DocumentDataSource(this.documentService);
    this.dataSource.loadDocuments();
  }

  editDocument(document: IDocument) {
    const dialogRef = this.dialog.open(DocumentEditComponent, {
      width: '600px',
      data: Object.assign({}, document),
      disableClose: true,
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.dataSource.loadDocuments();
        }
      });
  }

}
