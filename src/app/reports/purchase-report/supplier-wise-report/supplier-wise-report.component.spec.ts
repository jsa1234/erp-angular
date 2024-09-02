import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierWiseReportComponent } from './supplier-wise-report.component';

describe('SupplierWiseReportComponent', () => {
  let component: SupplierWiseReportComponent;
  let fixture: ComponentFixture<SupplierWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierWiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
