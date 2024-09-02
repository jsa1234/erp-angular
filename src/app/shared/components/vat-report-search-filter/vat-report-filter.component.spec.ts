import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatReportFilterComponent } from './vat-report-filter.component';

describe('VatReportFilterComponent', () => {
  let component: VatReportFilterComponent;
  let fixture: ComponentFixture<VatReportFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatReportFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
