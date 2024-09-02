import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeProductModalComponent } from './barcode-product-modal.component';

describe('BarcodeProductModalComponent', () => {
  let component: BarcodeProductModalComponent;
  let fixture: ComponentFixture<BarcodeProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
