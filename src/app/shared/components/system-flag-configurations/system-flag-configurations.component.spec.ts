import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFlagConfigurationsComponent } from './system-flag-configurations.component';

describe('SystemFlagConfigurationsComponent', () => {
  let component: SystemFlagConfigurationsComponent;
  let fixture: ComponentFixture<SystemFlagConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemFlagConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemFlagConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
