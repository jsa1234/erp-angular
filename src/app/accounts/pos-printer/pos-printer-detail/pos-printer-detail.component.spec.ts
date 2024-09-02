import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrinterDetailComponent } from './pos-printer-detail.component';

describe('PosPrinterDetailComponent', () => {
  let component: PosPrinterDetailComponent;
  let fixture: ComponentFixture<PosPrinterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosPrinterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrinterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
