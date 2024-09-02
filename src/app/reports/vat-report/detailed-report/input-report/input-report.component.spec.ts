import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputReportComponent } from './input-report.component';

describe('InputReportComponent', () => {
  let component: InputReportComponent;
  let fixture: ComponentFixture<InputReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
