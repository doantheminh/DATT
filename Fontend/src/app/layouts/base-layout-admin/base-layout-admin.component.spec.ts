import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutAdminComponent } from './base-layout-admin.component';

describe('BaseLayoutAdminComponent', () => {
  let component: BaseLayoutAdminComponent;
  let fixture: ComponentFixture<BaseLayoutAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLayoutAdminComponent]
    });
    fixture = TestBed.createComponent(BaseLayoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
