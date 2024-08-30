import { TestBed } from '@angular/core/testing';

import { RegisteredWithService } from './registered-with.service';

describe('RegisteredWithService', () => {
  let service: RegisteredWithService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredWithService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
