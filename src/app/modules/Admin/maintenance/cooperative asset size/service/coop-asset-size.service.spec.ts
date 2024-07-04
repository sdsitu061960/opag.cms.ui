import { TestBed } from '@angular/core/testing';

import { CoopAssetSizeService } from './coop-asset-size.service';

describe('CoopAssetSizeService', () => {
  let service: CoopAssetSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopAssetSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
