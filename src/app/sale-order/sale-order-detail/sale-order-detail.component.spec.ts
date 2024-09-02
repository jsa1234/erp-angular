import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderDetailComponent } from './sale-order-detail.component';

describe('SaleOrderDetailComponent', () => {
  let component: SaleOrderDetailComponent;
  let fixture: ComponentFixture<SaleOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
