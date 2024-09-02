import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from 'src/app/base.component';
import { SyncSessionsDataSource } from './sync-sessions-datasource';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { tap } from 'rxjs/operators';
import { SyncResourceParameter } from '@core/domain-classes/sync-resource-parameter';
import { DeviceService } from '../../device.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sync-sessions',
  templateUrl: './sync-sessions.component.html',
  styleUrls: ['./sync-sessions.component.scss']
})
export class SyncSessionsComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dataSource:SyncSessionsDataSource
  syncSessionsResource:SyncResourceParameter
displayedColumns = [
  '#',
  'session',
  'type',
  'table',
  'action',
  'status',
  'startedOn',
  'completeFailedOn'
];
footerToDisplayed: string[] = ['footer'];
  constructor(private syncLogsService:DeviceService,
    private route:ActivatedRoute) { 
    super()
    this.syncSessionsResource = new SyncResourceParameter();
    this.syncSessionsResource.pageSize = 10  
    this.syncSessionsResource.DeviceUUID = route.snapshot.params.id
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.dataSource = new SyncSessionsDataSource(this.syncLogsService);
    this.dataSource.loadData(this.syncSessionsResource);
    this.getResourceParameter();
  }
  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.syncSessionsResource.pageSize = c.pageSize;
          this.syncSessionsResource.skip = c.skip;
          this.syncSessionsResource.totalCount = c.totalCount;
        }
      });
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.syncSessionsResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.syncSessionsResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.syncSessionsResource);
        })
      )
      .subscribe();
  }

}
