import { TestBed } from '@angular/core/testing';

import { RboCategoryService } from './rbo-category.service';

describe('RboCategoryService', () => {
  let service: RboCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RboCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
