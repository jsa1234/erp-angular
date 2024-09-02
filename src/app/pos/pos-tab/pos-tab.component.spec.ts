import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTabComponent } from './pos-tab.component';

describe('PosTabComponent', () => {
  let component: PosTabComponent;
  let fixture: ComponentFixture<PosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
