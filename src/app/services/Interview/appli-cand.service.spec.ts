import { TestBed } from '@angular/core/testing';

import { AppliCandService } from './appli-cand.service';

describe('AppliCandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppliCandService = TestBed.get(AppliCandService);
    expect(service).toBeTruthy();
  });
});
