import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrinterDetailDialogComponent } from './pos-printer-detail-dialog.component';

describe('PosPrinterDetailDialogComponent', () => {
  let component: PosPrinterDetailDialogComponent;
  let fixture: ComponentFixture<PosPrinterDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosPrinterDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrinterDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
