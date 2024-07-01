import { TestBed } from '@angular/core/testing';

import { BarangayServiceService } from './barangay-service.service';

describe('BarangayServiceService', () => {
  let service: BarangayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarangayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
