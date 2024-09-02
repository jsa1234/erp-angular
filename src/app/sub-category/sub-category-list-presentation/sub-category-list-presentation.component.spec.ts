import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryListPresentationComponent } from './sub-category-list-presentation.component';

describe('SubCategoryListPresentationComponent', () => {
  let component: SubCategoryListPresentationComponent;
  let fixture: ComponentFixture<SubCategoryListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
