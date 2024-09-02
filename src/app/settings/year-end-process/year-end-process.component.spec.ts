import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndProcessComponent } from './year-end-process.component';

describe('YearEndProcessComponent', () => {
  let component: YearEndProcessComponent;
  let fixture: ComponentFixture<YearEndProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearEndProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearEndProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
