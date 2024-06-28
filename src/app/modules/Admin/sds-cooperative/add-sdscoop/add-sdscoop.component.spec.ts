import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSdscoopComponent } from './add-sdscoop.component';

describe('AddSdscoopComponent', () => {
  let component: AddSdscoopComponent;
  let fixture: ComponentFixture<AddSdscoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSdscoopComponent]
    });
    fixture = TestBed.createComponent(AddSdscoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
