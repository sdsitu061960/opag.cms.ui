import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayListComponent } from './barangay-list.component';

describe('BarangayListComponent', () => {
  let component: BarangayListComponent;
  let fixture: ComponentFixture<BarangayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayListComponent]
    });
    fixture = TestBed.createComponent(BarangayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
