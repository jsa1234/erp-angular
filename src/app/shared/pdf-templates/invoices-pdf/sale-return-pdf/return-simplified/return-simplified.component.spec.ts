import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnSimplifiedComponent } from './return-simplified.component';

describe('ReturnSimplifiedComponent', () => {
  let component: ReturnSimplifiedComponent;
  let fixture: ComponentFixture<ReturnSimplifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnSimplifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnSimplifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
