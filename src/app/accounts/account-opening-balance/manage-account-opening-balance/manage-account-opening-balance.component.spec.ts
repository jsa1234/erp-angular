import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountOpeningBalanceComponent } from './manage-account-opening-balance.component';

describe('ManageAccountOpeningBalanceComponent', () => {
  let component: ManageAccountOpeningBalanceComponent;
  let fixture: ComponentFixture<ManageAccountOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccountOpeningBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
