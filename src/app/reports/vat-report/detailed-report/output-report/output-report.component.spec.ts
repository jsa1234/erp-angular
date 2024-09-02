import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputReportComponent } from './output-report.component';

describe('OutputReportComponent', () => {
  let component: OutputReportComponent;
  let fixture: ComponentFixture<OutputReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
