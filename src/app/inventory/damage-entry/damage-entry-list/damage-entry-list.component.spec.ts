import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageEntryListComponent } from './damage-entry-list.component';

describe('DamageEntryListComponent', () => {
  let component: DamageEntryListComponent;
  let fixture: ComponentFixture<DamageEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageEntryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
