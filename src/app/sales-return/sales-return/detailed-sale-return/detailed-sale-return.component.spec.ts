import { ComponentFixture, TestBed } from '@angular/core/testing';

import DetailedSaleReturnComponent from './detailed-sale-return.component';

describe('DetailedSaleReturnComponent', () => {
  let component: DetailedSaleReturnComponent;
  let fixture: ComponentFixture<DetailedSaleReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSaleReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
