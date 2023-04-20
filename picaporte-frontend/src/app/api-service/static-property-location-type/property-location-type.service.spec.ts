import { TestBed } from '@angular/core/testing';

import { PropertyLocationTypeService } from './property-location-type.service';

describe('PropertyLocationTypeService', () => {
  let service: PropertyLocationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyLocationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
