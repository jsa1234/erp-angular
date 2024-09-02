import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferItemComponent } from './stock-transfer-item.component';

describe('StockTransferItemComponent', () => {
  let component: StockTransferItemComponent;
  let fixture: ComponentFixture<StockTransferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTransferItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
