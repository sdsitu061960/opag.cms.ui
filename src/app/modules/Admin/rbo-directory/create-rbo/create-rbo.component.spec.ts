import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRboComponent } from './create-rbo.component';

describe('CreateRboComponent', () => {
  let component: CreateRboComponent;
  let fixture: ComponentFixture<CreateRboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRboComponent]
    });
    fixture = TestBed.createComponent(CreateRboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
