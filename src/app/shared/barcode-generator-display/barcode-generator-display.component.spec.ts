import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeGeneratorDisplayComponent } from './barcode-generator-display.component';

describe('BarcodeGeneratorDisplayComponent', () => {
  let component: BarcodeGeneratorDisplayComponent;
  let fixture: ComponentFixture<BarcodeGeneratorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeGeneratorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeGeneratorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
