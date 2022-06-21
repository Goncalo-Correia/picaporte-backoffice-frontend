import { TestBed } from '@angular/core/testing';

import { PropertyConditionStatusService } from './property-condition-status.service';

describe('PropertyConditionStatusService', () => {
  let service: PropertyConditionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyConditionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
