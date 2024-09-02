import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictListPresentationComponent } from './district-list-presentation.component';

describe('DistrictListPresentationComponent', () => {
  let component: DistrictListPresentationComponent;
  let fixture: ComponentFixture<DistrictListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
