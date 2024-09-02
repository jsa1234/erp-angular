import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListPresentationComponent } from './state-list-presentation.component';

describe('StateListPresentationComponent', () => {
  let component: StateListPresentationComponent;
  let fixture: ComponentFixture<StateListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
