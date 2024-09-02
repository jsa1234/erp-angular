import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModeDropdownComponent } from './transaction-mode-dropdown.component';

describe('TransactionModeDropdownComponent', () => {
  let component: TransactionModeDropdownComponent;
  let fixture: ComponentFixture<TransactionModeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionModeDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionModeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
