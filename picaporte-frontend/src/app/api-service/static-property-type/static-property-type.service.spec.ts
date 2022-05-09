import { TestBed } from '@angular/core/testing';

import { StaticPropertyTypeService } from './static-property-type.service';

describe('StaticPropertyTypeService', () => {
  let service: StaticPropertyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPropertyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
