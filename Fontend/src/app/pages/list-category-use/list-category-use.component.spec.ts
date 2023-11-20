import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryUseComponent } from './list-category-use.component';

describe('ListCategoryUseComponent', () => {
  let component: ListCategoryUseComponent;
  let fixture: ComponentFixture<ListCategoryUseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoryUseComponent]
    });
    fixture = TestBed.createComponent(ListCategoryUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
