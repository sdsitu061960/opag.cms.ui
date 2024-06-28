import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdscooplistComponent } from './sdscooplist.component';

describe('SdscooplistComponent', () => {
  let component: SdscooplistComponent;
  let fixture: ComponentFixture<SdscooplistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SdscooplistComponent]
    });
    fixture = TestBed.createComponent(SdscooplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
