import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningBalanceListComponent } from './account-opening-balance-list.component';

describe('AccountOpeningBalanceListComponent', () => {
  let component: AccountOpeningBalanceListComponent;
  let fixture: ComponentFixture<AccountOpeningBalanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningBalanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
