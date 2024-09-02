import { TestBed } from '@angular/core/testing';

import { SaleReturnReportService } from './sale-return-report.service';

describe('SaleReturnReportService', () => {
  let service: SaleReturnReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleReturnReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
