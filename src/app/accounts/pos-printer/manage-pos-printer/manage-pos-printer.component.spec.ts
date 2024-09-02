import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePosPrinterComponent } from './manage-pos-printer.component';

describe('ManagePosPrinterComponent', () => {
  let component: ManagePosPrinterComponent;
  let fixture: ComponentFixture<ManagePosPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePosPrinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePosPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
