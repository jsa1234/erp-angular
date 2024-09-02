import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifiedComponent } from './simplified.component';

describe('SimplifiedComponent', () => {
  let component: SimplifiedComponent;
  let fixture: ComponentFixture<SimplifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
