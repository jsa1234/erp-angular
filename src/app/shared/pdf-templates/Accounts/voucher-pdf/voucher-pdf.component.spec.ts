import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPdfComponent } from './voucher-pdf.component';

describe('VoucherPdfComponent', () => {
  let component: VoucherPdfComponent;
  let fixture: ComponentFixture<VoucherPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
