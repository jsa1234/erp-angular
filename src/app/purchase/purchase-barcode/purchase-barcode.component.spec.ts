import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBarcodeComponent } from './purchase-barcode.component';

describe('PurchaseBarcodeComponent', () => {
  let component: PurchaseBarcodeComponent;
  let fixture: ComponentFixture<PurchaseBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBarcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
