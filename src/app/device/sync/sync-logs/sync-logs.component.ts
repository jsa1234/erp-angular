import { Component, OnInit, ViewChild } from '@angular/core';
import { SyncLogsDataSource } from './sync-logs-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { SyncResourceParameter } from '@core/domain-classes/sync-resource-parameter';
import { DeviceService } from '../../device.service';
import { BaseComponent } from 'src/app/base.component';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { tap } from 'rxjs/operators';
import {  ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sync-logs',
  templateUrl: './sync-logs.component.html',
  styleUrls: ['./sync-logs.component.scss']
})
export class SyncLogsComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dataSource:SyncLogsDataSource
  syncLogResource:SyncResourceParameter
  displayedColumns = [
    '#',
    'date',
    'time',
    'session',
    'table',
    'action',
    'status',
    'logDescription'
  ];
  footerToDisplayed: string[] = ['footer'];
  constructor(private syncLogsService:DeviceService,
    private route:ActivatedRoute) { 
    super()
    this.syncLogResource = new SyncResourceParameter();
    this.syncLogResource.pageSize = 10  
    this.syncLogResource.DeviceUUID = route.snapshot.params.id
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.dataSource = new SyncLogsDataSource(this.syncLogsService);
    this.dataSource.loadData(this.syncLogResource);
    this.getResourceParameter();
  }
  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.syncLogResource.pageSize = c.pageSize;
          this.syncLogResource.skip = c.skip;
          this.syncLogResource.totalCount = c.totalCount;
        }
      });
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0
    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.syncLogResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.syncLogResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.syncLogResource);
        })
      )
      .subscribe();
  }

  

}
