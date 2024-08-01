import { TestBed } from '@angular/core/testing';

import { RboDirectoryService } from './rbo-directory.service';

describe('RboDirectoryService', () => {
  let service: RboDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RboDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
