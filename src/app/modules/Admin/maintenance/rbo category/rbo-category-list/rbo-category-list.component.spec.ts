import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RboCategoryListComponent } from './rbo-category-list.component';

describe('RboCategoryListComponent', () => {
  let component: RboCategoryListComponent;
  let fixture: ComponentFixture<RboCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RboCategoryListComponent]
    });
    fixture = TestBed.createComponent(RboCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
