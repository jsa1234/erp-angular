import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifiedSaleReturnComponent } from './simplified-sale-return.component';

describe('SimplifiedSaleReturnComponent', () => {
  let component: SimplifiedSaleReturnComponent;
  let fixture: ComponentFixture<SimplifiedSaleReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifiedSaleReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifiedSaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
