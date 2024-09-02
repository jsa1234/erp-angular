import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageEntryDetailsComponent } from './damage-entry-details.component';

describe('DamageEntryDetailsComponent', () => {
  let component: DamageEntryDetailsComponent;
  let fixture: ComponentFixture<DamageEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageEntryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
