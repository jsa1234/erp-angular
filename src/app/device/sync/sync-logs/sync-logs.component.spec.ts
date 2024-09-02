import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncLogsComponent } from './sync-logs.component';

describe('SyncLogsComponent', () => {
  let component: SyncLogsComponent;
  let fixture: ComponentFixture<SyncLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
