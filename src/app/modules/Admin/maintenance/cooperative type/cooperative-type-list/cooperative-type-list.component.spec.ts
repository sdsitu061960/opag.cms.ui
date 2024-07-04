import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeTypeListComponent } from './cooperative-type-list.component';

describe('CooperativeTypeListComponent', () => {
  let component: CooperativeTypeListComponent;
  let fixture: ComponentFixture<CooperativeTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CooperativeTypeListComponent]
    });
    fixture = TestBed.createComponent(CooperativeTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
