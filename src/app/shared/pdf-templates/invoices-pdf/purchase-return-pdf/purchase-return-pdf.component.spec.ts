import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnPdfComponent } from './purchase-return-pdf.component';

describe('PurchaseReturnPdfComponent', () => {
  let component: PurchaseReturnPdfComponent;
  let fixture: ComponentFixture<PurchaseReturnPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
