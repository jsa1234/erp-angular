import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutCountdownModalComponent } from './logout-countdown-modal.component';

describe('LogoutCountdownModalComponent', () => {
  let component: LogoutCountdownModalComponent;
  let fixture: ComponentFixture<LogoutCountdownModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutCountdownModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutCountdownModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
