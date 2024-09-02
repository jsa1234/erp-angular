import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJournalComponent } from './manage-journal.component';

describe('ManageJournalComponent', () => {
  let component: ManageJournalComponent;
  let fixture: ComponentFixture<ManageJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
