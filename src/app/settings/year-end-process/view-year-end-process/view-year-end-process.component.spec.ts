import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYearEndProcessComponent } from './view-year-end-process.component';

describe('ViewYearEndProcessComponent', () => {
  let component: ViewYearEndProcessComponent;
  let fixture: ComponentFixture<ViewYearEndProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewYearEndProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewYearEndProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
