import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageEntryItemComponent } from './damage-entry-item.component';

describe('DamageEntryItemComponent', () => {
  let component: DamageEntryItemComponent;
  let fixture: ComponentFixture<DamageEntryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageEntryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEntryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
