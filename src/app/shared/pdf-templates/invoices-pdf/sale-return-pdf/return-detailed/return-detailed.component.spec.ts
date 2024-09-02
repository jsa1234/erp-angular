import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDetailedComponent } from './return-detailed.component';

describe('ReturnDetailedComponent', () => {
  let component: ReturnDetailedComponent;
  let fixture: ComponentFixture<ReturnDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
