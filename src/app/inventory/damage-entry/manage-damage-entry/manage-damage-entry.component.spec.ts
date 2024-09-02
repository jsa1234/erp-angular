import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDamageEntryComponent } from './manage-damage-entry.component';

describe('ManageDamageEntryComponent', () => {
  let component: ManageDamageEntryComponent;
  let fixture: ComponentFixture<ManageDamageEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDamageEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDamageEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
