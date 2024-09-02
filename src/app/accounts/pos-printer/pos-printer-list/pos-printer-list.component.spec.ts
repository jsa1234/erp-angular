import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPrinterListComponent } from './pos-printer-list.component';

describe('PosPrinterListComponent', () => {
  let component: PosPrinterListComponent;
  let fixture: ComponentFixture<PosPrinterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosPrinterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPrinterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
