import { TestBed } from '@angular/core/testing';

import { CooperativeTypeService } from './cooperative-type.service';

describe('CooperativeTypeService', () => {
  let service: CooperativeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperativeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
