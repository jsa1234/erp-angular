import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListPresentatiomComponent } from './module-list-presentatiom.component';

describe('ModuleListPresentatiomComponent', () => {
  let component: ModuleListPresentatiomComponent;
  let fixture: ComponentFixture<ModuleListPresentatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleListPresentatiomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListPresentatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
