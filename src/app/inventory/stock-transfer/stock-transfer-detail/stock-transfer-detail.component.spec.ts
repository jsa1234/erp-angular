import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferDetailComponent } from './stock-transfer-detail.component';

describe('StockTransferDetailComponent', () => {
  let component: StockTransferDetailComponent;
  let fixture: ComponentFixture<StockTransferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTransferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
