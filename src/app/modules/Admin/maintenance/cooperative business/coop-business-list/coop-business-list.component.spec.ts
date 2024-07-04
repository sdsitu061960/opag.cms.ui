import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopBusinessListComponent } from './coop-business-list.component';

describe('CoopBusinessListComponent', () => {
  let component: CoopBusinessListComponent;
  let fixture: ComponentFixture<CoopBusinessListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoopBusinessListComponent]
    });
    fixture = TestBed.createComponent(CoopBusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
