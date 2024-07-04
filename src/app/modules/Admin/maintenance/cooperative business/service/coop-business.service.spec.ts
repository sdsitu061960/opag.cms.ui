import { TestBed } from '@angular/core/testing';

import { CoopBusinessService } from './coop-business.service';

describe('CoopBusinessService', () => {
  let service: CoopBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
