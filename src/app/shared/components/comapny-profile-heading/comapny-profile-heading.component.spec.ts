import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnyProfileHeadingComponent } from './comapny-profile-heading.component';

describe('ComapnyProfileHeadingComponent', () => {
  let component: ComapnyProfileHeadingComponent;
  let fixture: ComponentFixture<ComapnyProfileHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComapnyProfileHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapnyProfileHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
