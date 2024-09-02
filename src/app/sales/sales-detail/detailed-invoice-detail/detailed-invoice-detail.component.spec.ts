import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedInvoiceDetailComponent } from './detailed-invoice-detail.component';

describe('DetailedInvoiceDetailComponent', () => {
  let component: DetailedInvoiceDetailComponent;
  let fixture: ComponentFixture<DetailedInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedInvoiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
