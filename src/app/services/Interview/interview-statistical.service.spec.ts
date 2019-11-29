import { TestBed } from '@angular/core/testing';

import { InterviewStatisticalService } from './interview-statistical.service';

describe('InterviewStatisticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewStatisticalService = TestBed.get(InterviewStatisticalService);
    expect(service).toBeTruthy();
  });
});
