import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSaleOrderComponent } from './manage-sale-order.component';

describe('ManageSaleOrderComponent', () => {
  let component: ManageSaleOrderComponent;
  let fixture: ComponentFixture<ManageSaleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSaleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSaleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
