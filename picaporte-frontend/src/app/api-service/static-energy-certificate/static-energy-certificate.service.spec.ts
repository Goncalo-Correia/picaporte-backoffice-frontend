import { TestBed } from '@angular/core/testing';

import { StaticEnergyCertificateService } from './static-energy-certificate.service';

describe('StaticEnergyCertificateService', () => {
  let service: StaticEnergyCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticEnergyCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
