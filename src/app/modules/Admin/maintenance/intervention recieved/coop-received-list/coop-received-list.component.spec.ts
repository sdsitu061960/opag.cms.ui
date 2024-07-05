import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopReceivedListComponent } from './coop-received-list.component';

describe('CoopReceivedListComponent', () => {
  let component: CoopReceivedListComponent;
  let fixture: ComponentFixture<CoopReceivedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoopReceivedListComponent]
    });
    fixture = TestBed.createComponent(CoopReceivedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
