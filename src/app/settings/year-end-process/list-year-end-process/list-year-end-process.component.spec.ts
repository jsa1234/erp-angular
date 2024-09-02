import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYearEndProcessComponent } from './list-year-end-process.component';

describe('ListYearEndProcessComponent', () => {
  let component: ListYearEndProcessComponent;
  let fixture: ComponentFixture<ListYearEndProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYearEndProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYearEndProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
