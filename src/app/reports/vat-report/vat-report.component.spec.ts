import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VATReportComponent } from './vat-report.component';

describe('VATReportComponent', () => {
  let component: VATReportComponent;
  let fixture: ComponentFixture<VATReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VATReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VATReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
