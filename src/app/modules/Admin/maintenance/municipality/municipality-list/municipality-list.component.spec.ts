import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityListComponent } from './municipality-list.component';

describe('MunicipalityListComponent', () => {
  let component: MunicipalityListComponent;
  let fixture: ComponentFixture<MunicipalityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipalityListComponent]
    });
    fixture = TestBed.createComponent(MunicipalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
