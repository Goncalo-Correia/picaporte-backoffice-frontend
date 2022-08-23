import { TestBed } from '@angular/core/testing';

import { StaticRentingTypeActionService } from './renting-type-action.service';

describe('RentingTypeActionService', () => {
  let service: StaticRentingTypeActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticRentingTypeActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
