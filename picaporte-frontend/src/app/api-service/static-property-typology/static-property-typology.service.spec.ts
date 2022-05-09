import { TestBed } from '@angular/core/testing';

import { StaticPropertyTypologyService } from './static-property-typology.service';

describe('StaticPropertyTypologyService', () => {
  let service: StaticPropertyTypologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPropertyTypologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
