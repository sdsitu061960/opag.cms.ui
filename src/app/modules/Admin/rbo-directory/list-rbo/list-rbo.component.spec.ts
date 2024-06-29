import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRboComponent } from './list-rbo.component';

describe('ListRboComponent', () => {
  let component: ListRboComponent;
  let fixture: ComponentFixture<ListRboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRboComponent]
    });
    fixture = TestBed.createComponent(ListRboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
