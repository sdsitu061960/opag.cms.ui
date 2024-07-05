import { TestBed } from '@angular/core/testing';

import { CoopReceivedService } from './coop-received.service';

describe('CoopReceivedService', () => {
  let service: CoopReceivedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopReceivedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
