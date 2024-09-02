import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientListComponent } from './product-varient-list.component';

describe('ProductVarientListComponent', () => {
  let component: ProductVarientListComponent;
  let fixture: ComponentFixture<ProductVarientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVarientListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVarientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
