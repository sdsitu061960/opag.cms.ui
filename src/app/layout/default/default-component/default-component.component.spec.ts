import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponentComponent } from './default-component.component';

describe('DefaultComponentComponent', () => {
  let component: DefaultComponentComponent;
  let fixture: ComponentFixture<DefaultComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultComponentComponent]
    });
    fixture = TestBed.createComponent(DefaultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
