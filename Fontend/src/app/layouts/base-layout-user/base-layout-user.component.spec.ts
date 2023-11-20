import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutUserComponent } from './base-layout-user.component';

describe('BaseLayoutUserComponent', () => {
  let component: BaseLayoutUserComponent;
  let fixture: ComponentFixture<BaseLayoutUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLayoutUserComponent]
    });
    fixture = TestBed.createComponent(BaseLayoutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
