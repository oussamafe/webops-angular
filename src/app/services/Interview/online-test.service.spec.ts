import { TestBed } from '@angular/core/testing';

import { OnlineTestService } from './online-test.service';

describe('OnlineTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineTestService = TestBed.get(OnlineTestService);
    expect(service).toBeTruthy();
  });
});
