import { TestBed } from '@angular/core/testing';

import { CooperativeNameService } from './cooperative-name.service';

describe('CooperativeNameService', () => {
  let service: CooperativeNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperativeNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
