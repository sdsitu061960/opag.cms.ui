import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopAssetSizeListComponent } from './coop-asset-size-list.component';

describe('CoopAssetSizeListComponent', () => {
  let component: CoopAssetSizeListComponent;
  let fixture: ComponentFixture<CoopAssetSizeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoopAssetSizeListComponent]
    });
    fixture = TestBed.createComponent(CoopAssetSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
