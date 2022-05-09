import { TestBed } from '@angular/core/testing';

import { StaticPropertyStatusService } from './static-property-status.service';

describe('StaticPropertyStatusService', () => {
  let service: StaticPropertyStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPropertyStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
