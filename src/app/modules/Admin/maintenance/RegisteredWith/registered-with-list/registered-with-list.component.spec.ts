import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredWithListComponent } from './registered-with-list.component';

describe('RegisteredWithListComponent', () => {
  let component: RegisteredWithListComponent;
  let fixture: ComponentFixture<RegisteredWithListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredWithListComponent]
    });
    fixture = TestBed.createComponent(RegisteredWithListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
