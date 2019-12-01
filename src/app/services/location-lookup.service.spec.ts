import { TestBed } from '@angular/core/testing';

import { LocationLookupService } from './location-lookup.service';

describe('LocationLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationLookupService = TestBed.get(LocationLookupService);
    expect(service).toBeTruthy();
  });
});
