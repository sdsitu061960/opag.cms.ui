import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopCategoryNameListComponent } from './coop-category-name-list.component';

describe('CoopCategoryNameListComponent', () => {
  let component: CoopCategoryNameListComponent;
  let fixture: ComponentFixture<CoopCategoryNameListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoopCategoryNameListComponent]
    });
    fixture = TestBed.createComponent(CoopCategoryNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
