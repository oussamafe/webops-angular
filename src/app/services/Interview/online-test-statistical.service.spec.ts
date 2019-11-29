import { TestBed } from '@angular/core/testing';

import { OnlineTestStatisticalService } from './online-test-statistical.service';

describe('OnlineTestStatisticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineTestStatisticalService = TestBed.get(OnlineTestStatisticalService);
    expect(service).toBeTruthy();
  });
});
